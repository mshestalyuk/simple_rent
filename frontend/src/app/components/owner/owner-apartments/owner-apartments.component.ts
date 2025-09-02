// owner-apartments.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/services/apartment.service';

interface Apartment {
  id: number;
  address: string;
  note: string;
}

interface ToastMessage {
  severity: 'success' | 'error' | 'info' | 'warn';
  summary: string;
  detail: string;
}

@Component({
  selector: 'app-owner-apartments',
  templateUrl: './owner-apartments.component.html',
  styleUrls: ['./owner-apartments.component.css']
})
export class OwnerApartmentsComponent implements OnInit {
  apartments: Apartment[] = [];
  newApartment: { address: string; note: string } = { address: '', note: '' };
  toastMessage: ToastMessage | null = null;
  private toastTimeout: any;

  constructor(
    private router: Router,
    private apartmentService: ApartmentService
  ) { }

  ngOnInit(): void {
    this.getApartments();
  }

  // Toast notification methods
  showToast(severity: 'success' | 'error' | 'info' | 'warn', summary: string, detail: string): void {
    this.toastMessage = { severity, summary, detail };
    
    // Clear any existing timeout
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    
    // Auto-hide after 5 seconds
    this.toastTimeout = setTimeout(() => {
      this.clearToast();
    }, 5000);
  }

  clearToast(): void {
    this.toastMessage = null;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  getApartments(): void {
    this.apartmentService.getApartments().subscribe(
      (response: any) => {
        // Check if data exists and handle both array and paginated responses
        if (response) {
          // If response has content property (paginated response)
          if (response.content && Array.isArray(response.content)) {
            this.apartments = response.content;
          } 
          // If response is directly an array
          else if (Array.isArray(response)) {
            this.apartments = response;
          }
          // If response is a single object, wrap it in an array
          else if (typeof response === 'object') {
            this.apartments = [response];
          }
        } else {
          this.apartments = [];
        }
      },
      (error) => {
        console.error('Error fetching apartments:', error);
        this.showToast('error', 'Error', 'Failed to load apartments. Please try again.');
        this.apartments = [];
      }
    );
  }

  addApartment(): void {
    // Validate input
    if (!this.newApartment.address || this.newApartment.address.trim() === '') {
      this.showToast('warn', 'Validation Error', 'Please enter a valid address');
      return;
    }

    // Show loading message
    this.showToast('info', 'Processing', 'Adding apartment...');

    this.apartmentService.addApartment(this.newApartment).subscribe(
      (response: any) => {
        this.showToast('success', 'Success', 'Apartment added successfully!');
        
        // Refresh the apartments list
        this.getApartments();
        
        // Clear the form
        this.newApartment = { address: '', note: '' };
      },
      (error) => {
        console.error('Error adding apartment:', error);
        this.showToast('error', 'Error', 'Failed to add apartment. Please try again.');
      }
    );
  }

  deleteApartment(event: Event, apartmentId: number): void {
    // Stop event propagation to prevent card click
    event.stopPropagation();
    
    // Optional: Add confirmation dialog here
    if (!confirm('Are you sure you want to delete this apartment?')) {
      return;
    }

    this.showToast('info', 'Processing', 'Deleting apartment...');

    this.apartmentService.deleteApartment(apartmentId).subscribe(
      (response: any) => {
        this.showToast('success', 'Success', 'Apartment deleted successfully!');
        
        // Remove the apartment from the local array for immediate UI update
        this.apartments = this.apartments.filter(apt => apt.id !== apartmentId);
        
        // Optionally refresh the entire list from server
        // this.getApartments();
      },
      (error) => {
        console.error('Error deleting apartment:', error);
        this.showToast('error', 'Error', 'Failed to delete apartment. Please try again.');
      }
    );
  }

  onApartmentClick(apartmentId: number): void {
    // Navigate to apartment management page
    this.router.navigate(['/owner/owner-apartment-management', apartmentId]);
  }
}