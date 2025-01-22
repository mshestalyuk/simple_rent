import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/services/apartment.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-owner-apartments',
  templateUrl: './owner-apartments.component.html',
  styleUrls: ['./owner-apartments.component.css']
})
export class OwnerApartmentsComponent implements OnInit {
  apartments: any = {};
  newApartment: any = { address: '', note: '' };
  constructor(
    private router: Router, 
    private apartmentService: ApartmentService,
    private msgService: MessageService
    ) { }

  ngOnInit(): void {
    this.getApartments();
  }

  getApartments(): void {
    this.apartmentService.getApartments().subscribe(
      (response: any) => {
        // Sprawdź czy dane istnieją i czy zawierają content
        if (response) {
          this.apartments = response;
        }
      },
      (error) => {
        // Obsługa błędów, na przykład wyświetlanie komunikatu dla użytkownika
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Wystąpił błąd podczas pobierania mieszkań' });
      }
    );
  }
  

  addApartment(): void {
    this.apartmentService.addApartment(this.newApartment).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie dodano pomyślnie' });
        this.getApartments();
        // Wyczyść formularz po dodaniu nowego mieszkania
        this.newApartment = { address: '', note: '' };
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas dodawania mieszkania' });
      }
    );
  }

  deleteApartment(event: Event, apartmentId: number): void {
    event.stopPropagation(); // Zatrzymaj propagację zdarzenia
    this.apartmentService.deleteApartment(apartmentId).subscribe(
      (response: any) => {
        this.msgService.add({ severity: 'success', summary: 'Sukces', detail: 'Mieszkanie usunięto pomyślnie' });
        this.getApartments();
      },
      (error) => {
        this.msgService.add({ severity: 'error', summary: 'Błąd', detail: 'Wystąpił błąd podczas usuwania mieszkania' });
      }
    );
  }

  onApartmentClick(apartmentId: number): void {
    this.router.navigate(['/owner/owner-apartment-management', apartmentId]);
  }

}


