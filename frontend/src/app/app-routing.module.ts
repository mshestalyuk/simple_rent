//app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerComponent } from './components/owner/owner.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'owner', loadChildren: () => import('./components/owner/owner.module').then(m => m.OwnerModule), canActivate: [AuthGuard], data: { userType: 'owner' }  },
  { path: 'tenant', loadChildren: () => import('./components/renter/renter.module').then(m => m.RenterModule), canActivate: [AuthGuard], data: { userType: 'tenant' }  },
  // { path: 'owner', loadChildren: () => import('./components/owner/owner.module').then(m => m.OwnerModule)},
  // { path: 'tenant', loadChildren: () => import('./components/renter/renter.module').then(m => m.RenterModule)},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
