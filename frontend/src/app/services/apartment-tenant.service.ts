// In apartment-tenant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApartmentTenantService {
  private baseUrl = 'https://knowyourteacher.online:81/easyrent-api/v1';


  constructor(private http: HttpClient) { }

  getApartments(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/tenant/apartments`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  
  handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getRentContract(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/tenant/apartments/rentcontract`, { headers }).pipe(
      catchError(this.handleError)
    );


    
  }
    


  getRentContractTenants(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/tenant/apartments/rentcontract/tenant`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getRentContractDocuments(): Observable<string[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<string[]>(`${this.baseUrl}/tenant/apartments/rentcontract/document`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
