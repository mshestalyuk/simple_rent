import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    if (this.loginForm.valid) {
      const loginPayload: LoginForm = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || ''
      };
      this.authService.loginUser(loginPayload).subscribe(
        () => {
          if (this.authService.isLoggedIn()) {
            // Przekieruj do odpowiedniego dashboardu na podstawie roli
            const userType = this.authService.getLoggedInUser()?.role.toLowerCase();
            this.router.navigate([`${userType}`]);
            this.msgService.add({ severity: 'success', summary: 'Login success', detail: 'Witaj w EasyRent' });
          }
        },
        (error) => {
          this.msgService.add({ severity: 'error', summary: 'Login error', detail: 'Wpisz poprawne dane.' });
        }
      );
    } else {
      this.msgService.add({ severity: 'error', summary: 'Login erro', detail: 'Wpisz poprawne dane.' });
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;
  
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  returnHome() {
    this.router.navigate(['/home']);
  }
  redirectSection(sectionId: string) {
    this.router.navigate(['/home']);

    setTimeout(() => { // setTimeout aby dać czas na przekierowanie
      this.scrollToSection(sectionId);
    }, 100);
  }
}
