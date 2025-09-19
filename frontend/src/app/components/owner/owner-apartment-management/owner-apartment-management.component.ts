// owner-apartment-management.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { ApartmentService } from 'src/app/services/apartment.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-owner-apartment-management',
  templateUrl: './owner-apartment-management.component.html',
  styleUrls: ['./owner-apartment-management.component.css']
})
export class OwnerApartmentManagementComponent implements OnInit {
  apartmentId!: number;
  apartmentDetails: any = {};
  newTenantDetails: any = {};
  newRentContractDetails: any = {};
  rentContracts: any = { content: [] };
  tenants: any = { content: [] };
  
  selectedContractId: number = -1;
  addingNewContract: boolean = false;
  updateApartmentDiv: boolean = false;
  showRentContract: number = -1;
  
  // Add this property for file upload
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentService: ApartmentService,
    private authService: AuthService,
    private msgService: MessageService,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.apartmentId = params['id'];
      this.loadInitialData();
    });
  }

  async loadInitialData(): Promise<void> {
    await this.getApartmentDetails();
    await this.getRentContracts();
  }

  // Uncomment and use this method when ready
  deleteApartment(): void {
    if (confirm('Are you sure you want to delete this apartment?')) {
      this.apartmentService.deleteApartment(this.apartmentId).subscribe(
        (response: any) => {
          this.msgService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Apartment deleted successfully' 
          });
          this.router.navigate(['/owner/owner-apartments']);
        },
        (error) => {
          this.msgService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to delete apartment' 
          });
        }
      );
    }
  }
  
  getApartmentDetails(): void {
    this.apartmentService.getApartmentDetails(this.apartmentId).subscribe(
      (apartmentDetails: any) => {
        this.apartmentDetails = apartmentDetails;
      },
      (error) => {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load apartment details' 
        });
      }
    );
  }

  updateApartment(): void {
    this.apartmentService.updateApartment(this.apartmentId, this.apartmentDetails).subscribe(
      (response: any) => {
        this.msgService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Apartment updated successfully' 
        });
        this.updateApartmentDiv = false; 
      },
      (error) => {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to update apartment' 
        });
      }
    );
  }

  updateRentContract(): void {
    const contractId = this.rentContracts.content[this.showRentContract].id;
    const contract = this.rentContracts.content[this.showRentContract];
    
    // Fix the field name issue (monthPayment vs montPayment)
    const contractData = {
      ...contract,
      montPayment: contract.monthPayment || contract.montPayment
    };
    
    this.apartmentService.updateRentContract(this.apartmentId, contractId, contractData).subscribe(
      (response: any) => {
        this.msgService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Rent contract updated successfully' 
        });
      },
      (error) => {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to update rent contract' 
        });
      }
    );
  }

  deleteRentContract(): void {
    const contractId = this.rentContracts.content[this.showRentContract].id;
    
    if (confirm('Are you sure you want to delete this contract?')) {
      this.apartmentService.deleteRentContract(this.apartmentId, contractId).subscribe(
        (response: any) => {
          this.msgService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Rent contract deleted successfully' 
          });
          this.getRentContracts(); 
          this.showRentContract = -1; 
        },
        (error) => {
          this.msgService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to delete rent contract. Please remove tenants first.' 
          });
        }
      );
    }
  }

  updateTenantDetails(tenant: any): void {
    // Get the current contract ID
    const contractId = this.rentContracts.content[this.showRentContract].id;
    
    const updatedTenantDetails = {
      name: tenant.name,
      surname: tenant.surname,
      email: tenant.email,
      phoneNumber: tenant.phoneNumber
    };
  
    this.apartmentService.updateTenantDetails(this.apartmentId, contractId, tenant.id, updatedTenantDetails)
      .subscribe(
        (response: any) => {
          this.msgService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Tenant information updated successfully' 
          });
        },
        (error) => {
          this.msgService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to update tenant information' 
          });
        }
      );
  }
  
  deleteTenantDetails(rentContractId: any, tenantId: any): void {
    if (confirm('Are you sure you want to remove this tenant?')) {
      this.apartmentService.deleteTenantDetails(this.apartmentId, rentContractId, tenantId)
        .subscribe(
          (response: any) => {
            this.msgService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Tenant removed successfully' 
            });
            // Refresh tenant list
            this.getTenants(rentContractId);
          },
          (error) => {
            this.msgService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Failed to remove tenant' 
            });
          }
        );
    }
  }

  async getRentContracts(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apartmentService.getRentContracts(this.apartmentId).subscribe(
        (rentContracts: any) => {
          this.rentContracts = rentContracts;
          // Ensure content array exists
          if (!this.rentContracts.content) {
            this.rentContracts.content = [];
          }
          resolve();
        },
        (error) => {
          console.error('Error loading rent contracts:', error);
          this.rentContracts = { content: [] };
          reject(error);
        }
      );
    });
  }

  addRentContract(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const residentUserId = localStorage.getItem('residentUserId');
  
      if (residentUserId) {
        this.newRentContractDetails.residentUserId = +residentUserId;
        
        // Fix the field name issue
        this.newRentContractDetails.montPayment = this.newRentContractDetails.monthPayment;
  
        this.apartmentService.addRentContract(this.apartmentId, this.newRentContractDetails).subscribe(
          (response: any) => {
            this.msgService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Rent contract added successfully' 
            });
            resolve();
          },
          (error) => {
            this.msgService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Failed to add rent contract' 
            });
            reject(error);
          }
        );
      } else {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Resident user ID not found in localStorage' 
        });
        reject('No residentUserId in localStorage');
      }
    });
  }

  getTenants(id: number): void {
    this.apartmentService.getTenants(this.apartmentId, id).subscribe(
      (tenants: any) => {
        this.tenants = tenants;
        // Ensure content array exists
        if (!this.tenants.content) {
          this.tenants.content = [];
        }
      },
      (error) => {
        console.error('Error loading tenants:', error);
        this.tenants = { content: [] };
      }
    );
  }

  async addTenant(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(this.addingNewContract && this.rentContracts.content.length > 0) {
        const idx = this.rentContracts.content.length - 1;
        this.selectedContractId = this.rentContracts.content[idx].id;
      }
      
      if (this.selectedContractId === -1) {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Please select a contract first' 
        });
        reject('No contract selected');
        return;
      }
      
      this.apartmentService.addTenant(this.apartmentId, this.selectedContractId, this.newTenantDetails).subscribe(
        (response: any) => {
          this.msgService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Tenant added successfully' 
          });
          resolve();
        },
        (error) => {
          this.msgService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to add tenant' 
          });
          reject(error);
        }
      );
    });
  }

  registerTenant(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const newTenantDetails: RegistrationForm = {
        name: this.newTenantDetails.name,
        surname: this.newTenantDetails.surname,
        email: this.newTenantDetails.email,
        password: this.generateRandomPassword(), // Better than hardcoded password
        role: 'TENANT',
        contact_email: this.newTenantDetails.email,
        phone_number: this.newTenantDetails.phoneNumber || ''
      };
  
      this.authService.registerTenant(newTenantDetails).subscribe(
        (response: any) => {
          this.msgService.add({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'Tenant registered successfully' 
          });
          // Store the residentUserId if returned
          if (response && response.id) {
            localStorage.setItem('residentUserId', response.id.toString());
          }
          resolve(response);
        },
        (error) => {
          this.msgService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to register tenant' 
          });
          reject(error);
        }
      );
    });
  }

  async showRentContractDetails(index: number): Promise<void> {
    const contract = this.rentContracts.content[index];
    if (contract) {
      if (index === this.showRentContract) {
        this.showRentContract = -1;
      } else {
        await this.getTenants(contract.id);
        this.showRentContract = index;
      }
    }
  }

  showUpdateApartment(): void {
    this.updateApartmentDiv = !this.updateApartmentDiv;
  }

  async addNewTenant(): Promise<void> {
    try {
      // Validate form
      if (!this.validateTenantForm()) {
        return;
      }
      
      // Register tenant first
      await this.registerTenant();
      
      // If creating new contract
      if (this.addingNewContract) {
        await this.addRentContract();
        await this.getRentContracts();
      }
      
      // Add tenant to contract
      await this.addTenant();
      
      // Reset forms
      this.resetForms();
      
      // Refresh data
      await this.loadInitialData();
      
      this.msgService.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Tenant and contract created successfully' 
      });
    } catch (error) {
      console.error('Error in addNewTenant:', error);
    }
  }

  async addNewTenantToContract(): Promise<void> {
    try {
      // Validate form
      if (!this.validateTenantForm()) {
        return;
      }
      
      if (this.selectedContractId === -1) {
        this.msgService.add({ 
          severity: 'warn', 
          summary: 'Warning', 
          detail: 'Please select a contract' 
        });
        return;
      }
      
      // Register tenant first
      await this.registerTenant();
      
      // Add tenant to existing contract
      await this.addTenant();
      
      // Reset forms
      this.resetForms();
      
      // Refresh data
      await this.loadInitialData();
      
      this.msgService.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Tenant added to contract successfully' 
      });
    } catch (error) {
      console.error('Error in addNewTenantToContract:', error);
    }
  }

  // File upload methods
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.msgService.add({ 
        severity: 'info', 
        summary: 'File Selected', 
        detail: `Selected: ${file.name}` 
      });
    }
  }

  uploadDocument(contractId: number): void {
    if (!this.selectedFile) {
      this.msgService.add({ 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'Please select a file first' 
      });
      return;
    }
    
    this.apartmentService.addDocument(this.apartmentId, contractId, this.selectedFile).subscribe(
      (response: any) => {
        this.msgService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Document uploaded successfully' 
        });
        this.selectedFile = null;
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      (error) => {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to upload document' 
        });
      }
    );
  }

  downloadDocument(contractId: number): void {
    this.apartmentService.getDocument(this.apartmentId, contractId).subscribe(
      (blob: Blob) => {
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contract_${contractId}_document`;
        link.click();
        window.URL.revokeObjectURL(url);
        
        this.msgService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Document downloaded successfully' 
        });
      },
      (error) => {
        this.msgService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to download document' 
        });
      }
    );
  }

  // Helper methods
  private validateTenantForm(): boolean {
    if (!this.newTenantDetails.name || !this.newTenantDetails.surname || !this.newTenantDetails.email) {
      this.msgService.add({ 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'Please fill in all required tenant fields' 
      });
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newTenantDetails.email)) {
      this.msgService.add({ 
        severity: 'warn', 
        summary: 'Warning', 
        detail: 'Please enter a valid email address' 
      });
      return false;
    }
    
    // If creating new contract, validate contract fields
    if (this.addingNewContract) {
      if (!this.newRentContractDetails.conclusionDate || 
          !this.newRentContractDetails.expiresDate || 
          !this.newRentContractDetails.monthPayment) {
        this.msgService.add({ 
          severity: 'warn', 
          summary: 'Warning', 
          detail: 'Please fill in all contract fields' 
        });
        return false;
      }
      
      // Validate dates
      const startDate = new Date(this.newRentContractDetails.conclusionDate);
      const endDate = new Date(this.newRentContractDetails.expiresDate);
      if (startDate >= endDate) {
        this.msgService.add({ 
          severity: 'warn', 
          summary: 'Warning', 
          detail: 'End date must be after start date' 
        });
        return false;
      }
    }
    
    return true;
  }

  private generateRandomPassword(): string {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  private resetForms(): void {
    this.newTenantDetails = {};
    this.newRentContractDetails = {};
    this.addingNewContract = false;
    this.selectedContractId = -1;
    this.selectedFile = null;
  }

  reloadPage(): void {
    this.location.go(this.location.path());
    window.location.reload();
  }
}