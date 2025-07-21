import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/api/config');
  }

  getBackendUrl(): string {
    return this.config?.backendApiUrl || 'http://simplerent_backend:8081';
  }

  setConfig(config: any): void {
    this.config = config;
  }
}