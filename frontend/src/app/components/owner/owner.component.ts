import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private router: Router, 
    private authService: AuthService, 
    private msgService: MessageService) {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
    this.msgService.add({ severity: 'success', summary: 'Wylogowano', detail: 'Do zobaczenia' });
  }

}
