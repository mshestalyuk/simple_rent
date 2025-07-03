const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Compression middleware
app.use(compression());

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/data', (req, res) => {
  res.json({ 
    message: 'Hello from backend!',
    data: ['item1', 'item2', 'item3']
  });
});

// Debug endpoint to check file structure
app.get('/api/debug/files', (req, res) => {
  const distPath = path.join(__dirname, 'dist');
  
  try {
    const files = fs.readdirSync(distPath);
    res.json({
      distPath,
      files,
      indexExists: fs.existsSync(path.join(distPath, 'index.html'))
    });
  } catch (error) {
    res.json({
      error: error.message,
      distPath,
      exists: fs.existsSync(distPath)
    });
  }
});

app.get('/api/config', (req, res) => {
  res.json({
    backendApiUrl: process.env.BACKEND_API_URL || 'http://simplerent_backend:8081',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files from the Angular app
const staticPath = path.join(__dirname, 'dist');
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

// Catch all other routes and return the Angular index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error(`index.html not found at: ${indexPath}`);
    console.log('Directory contents:', fs.readdirSync(path.join(__dirname)));
    
    res.status(500).json({ 
      error: 'Angular build files not found',
      searched: indexPath,
      hint: 'Check if Angular build output matches Dockerfile COPY command'
    });
    return;
  }
  
  res.sendFile(indexPath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Working directory: ${__dirname}`);
  
  // Check if dist directory exists
  const distExists = fs.existsSync(path.join(__dirname, 'dist'));
  console.log(`Dist directory exists: ${distExists}`);
  
  if (distExists) {
    console.log('Dist contents:', fs.readdirSync(path.join(__dirname, 'dist')));
  }
});