// owner.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { OwnerAnnouncementsComponent } from './owner-announcements/owner-announcements.component';
import { OwnerApartmentsComponent } from './owner-apartments/owner-apartments.component';
import { OwnerHelloComponent } from './owner-hello/owner-hello.component';
import { OwnerReportsComponent } from './owner-reports/owner-reports.component';
import { OwnerAccountComponent } from './owner-account/owner-account.component';
import { OwnerApartmentManagementComponent } from './owner-apartment-management/owner-apartment-management.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerAnnouncementsComponent,
    OwnerApartmentsComponent,
    OwnerHelloComponent,
    OwnerReportsComponent,
    OwnerAccountComponent,
    OwnerApartmentManagementComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    FormsModule
  ]
})
export class OwnerModule { }
