// apartment-tenant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentTenantService extends BaseService {
  private get tenantUrl(): string {
    return `${this.getBaseUrl()}/easyrent-api/v1/tenant`;
  }

  constructor(
    private http: HttpClient,
    configService: ConfigService
  ) {
    super(configService);
  }

  getApartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tenantUrl}/apartments`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getRentContract(): Observable<any> {
    return this.http.get<any>(`${this.tenantUrl}/apartments/rentcontract`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getRentContractTenants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.tenantUrl}/apartments/rentcontract/tenant`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getRentContractDocuments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.tenantUrl}/apartments/rentcontract/document`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}