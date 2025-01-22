// In renter-apartment.component.ts
import { Component, OnInit } from '@angular/core';
import { ApartmentTenantService } from '../../../services/apartment-tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renter-apartment',
  templateUrl: './renter-apartment.component.html',
  styleUrls: ['./renter-apartment.component.css']
})
export class RenterApartmentComponent implements OnInit {
  apartment: any = null;

  constructor(
    private apartmentTenantService: ApartmentTenantService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.apartmentTenantService.getApartments().subscribe((data: any) => {
      this.apartment = data;
    });
  }
  redirectToApartmentDetails(apartmentId: number): void {
    // Assuming the route to the apartment details page is '/apartment-details/:id'
    this.router.navigate(['/tenant/tenant-apartment-management', apartmentId]);
  }
}
