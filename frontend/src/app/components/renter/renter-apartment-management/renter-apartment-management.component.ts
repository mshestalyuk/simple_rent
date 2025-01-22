import { Component, OnInit } from '@angular/core';
import { ApartmentTenantService } from 'src/app/services/apartment-tenant.service';

@Component({
  selector: 'app-renter-apartment-management',
  templateUrl: './renter-apartment-management.component.html',
  styleUrls: ['./renter-apartment-management.component.css']
})
export class RenterApartmentManagementComponent implements OnInit {
  rentContractDetails: any = null;
  tenants: any[] = [];
  documents: string[] = [];

  constructor(private apartmentTenantService: ApartmentTenantService) {}

  ngOnInit(): void {
    this.getRentContractDetails();
    this.getTenants();
    this.getDocuments();
  }

  getRentContractDetails(): void {
    this.apartmentTenantService.getRentContract().subscribe(
      data => {
        this.rentContractDetails = data;
      },
      error => {
        console.error('Error fetching rent contract details:', error);
      }
    );
  }

  getTenants(): void {
    this.apartmentTenantService.getRentContractTenants().subscribe(
      data => {
        this.tenants = data;
      },
      error => {
        console.error('Error fetching tenants:', error);
      }
    );
  }

  getDocuments(): void {
    this.apartmentTenantService.getRentContractDocuments().subscribe(
      data => {
        this.documents = data;
      },
      error => {
        console.error('Error fetching documents:', error);
      }
    );
  }
}
