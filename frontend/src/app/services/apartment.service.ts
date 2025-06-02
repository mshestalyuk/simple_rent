// apartment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private baseUrl = 'https://knowyourteacher.online:81/easyrent-api/v1/apartments';

  constructor(private http: HttpClient) { }

  // Apartmant creating managing ---> DONE!
  getApartments(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.baseUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addApartment(newApartment: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, newApartment, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteApartment(apartmentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}`;
    return this.http.delete(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getApartmentDetails(apartmentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateApartment(apartmentId: number, updatedApartment: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}`;
    return this.http.put(url, updatedApartment, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    // Apartmant creating managing ---> DONE!
  getRentContractDetails(apartmentId: number, contractId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateRentContract(apartmentId: number, contractId: number, updatedContract: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}`;
    return this.http.put(url, updatedContract, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteRentContract(apartmentId: number, contractId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}`;
    return this.http.delete(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  getTenantDetails(apartmentId: number, contractId: number, tenantId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/tenants/${tenantId}`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateTenantDetails(apartmentId: number, contractId: number, tenantId: number, updatedTenant: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/tenants/${tenantId}`;
    return this.http.put(url, updatedTenant, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteTenantDetails(apartmentId: number, contractId: number, tenantId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/tenants/${tenantId}`;
    return this.http.delete(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  getRentContracts(apartmentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  addRentContract(apartmentId: number, newContract: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts`;
    return this.http.post(url, newContract, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  getTenants(apartmentId: number, contractId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/tenants`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  addTenant(apartmentId: number, contractId: number, newTenant: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/tenants`;
    return this.http.post(url, newTenant, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  getDocument(apartmentId: number, contractId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/document`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  addDocument(apartmentId: number, contractId: number, newDocument: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/document`;
    return this.http.post(url, newDocument, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteDocument(apartmentId: number, contractId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/${apartmentId}/rentcontracts/${contractId}/document`;
    return this.http.delete(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // Rzucamy błąd dalej, aby mógł być obsłużony w komponencie
    throw error;
  }
}
