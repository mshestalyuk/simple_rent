import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css']
})
export class RenterComponent {
  constructor(private router: Router, 
    private authService: AuthService,
    private msgService: MessageService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.msgService.add({ severity: 'success', summary: 'Wylogowano', detail: 'Do zobaczenia' });
  }
}
