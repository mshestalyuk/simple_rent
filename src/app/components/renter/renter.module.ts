// renter.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenterRoutingModule } from './renter-routing.module';
import { RenterComponent } from './renter.component';
import { RenterAnnouncementsComponent } from './renter-announcements/renter-announcements.component';
import { RenterApartmentComponent } from './renter-apartment/renter-apartment.component';
import { RenterReportsComponent } from './renter-reports/renter-reports.component';
import { RenterAccountComponent } from './renter-account/renter-account.component';
import { RenterHelloComponent } from './renter-hello/renter-hello.component';
import { RenterApartmentManagementComponent } from './renter-apartment-management/renter-apartment-management.component';

@NgModule({
    declarations: [
        RenterComponent,
        RenterAnnouncementsComponent,
        RenterApartmentComponent,
        RenterReportsComponent,
        RenterAccountComponent,
        RenterHelloComponent,
        RenterApartmentManagementComponent
        
    ],
    imports: [
        CommonModule,
        RenterRoutingModule
    ]
})
export class RenterModule { }
