import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    contact_email: ['', [Validators.required, Validators.email]],
    phone_number: [''],
    role: [''],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get name() {
    return this.registerForm.controls['name'];
  }
  get surname() {
    return this.registerForm.controls['surname'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get contact_email(){
    return this.registerForm.controls['contact_email'];
  }
  get phone_number(){
    return this.registerForm.controls['phone_number'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get role() {
    return this.registerForm.controls['role'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    postData.role = "OWNER";
    this.authService.registerUser(postData as RegistrationForm).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'SUPER', detail: 'Zarejestrowano pomyslnie' });
        this.router.navigate(['login'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Glupku', detail: 'Co ty wpisales, wpisz poprawne dane.' });
      }
    )
  }
 

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const offset = 80;
  
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
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
