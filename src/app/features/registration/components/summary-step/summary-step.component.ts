import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-step',
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <mat-card class="p-6">
        <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Full Name</label>
            <p class="font-medium">
              {{ personalInfo()?.fullName || 'Not provided' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Date of Birth</label>
            <p class="font-medium">
              {{ formatDate(personalInfo()?.dateOfBirth) || 'Not provided' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">CPF</label>
            <p class="font-medium">{{ personalInfo()?.cpf || 'Not provided' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Phone Number</label>
            <p class="font-medium">
              {{ personalInfo()?.phoneNumber || 'Not provided' }}
            </p>
          </div>
        </div>
      </mat-card>

      <mat-card class="p-6">
        <h3 class="text-lg font-semibold mb-4">Address Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">CEP</label>
            <p class="font-medium">{{ residentialInfo()?.zipCode || 'Not provided' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Street</label>
            <p class="font-medium">
              {{ residentialInfo()?.address || 'Not provided' }}
            </p>
          </div>

          <div>
            <label class="text-sm text-gray-600">Neighborhood</label>
            <p class="font-medium">
              {{ residentialInfo()?.neighborhood || 'Not provided' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">City</label>
            <p class="font-medium">{{ residentialInfo()?.city || 'Not provided' }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-600">State</label>
            <p class="font-medium">
              {{ residentialInfo()?.state || 'Not provided' }}
            </p>
          </div>
        </div>
      </mat-card>

      <mat-card class="p-6">
        <h3 class="text-lg font-semibold mb-4">Professional Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Occupation</label>
            <p class="font-medium">
              {{ professionalInfo()?.occupation || 'Not provided' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Company</label>
            <p class="font-medium">
              {{ professionalInfo()?.company || 'Not provided' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Salary</label>
            <p class="font-medium">
              {{ formatSalary(professionalInfo()?.salary) || 'Not provided' }}
            </p>
          </div>
        </div>
      </mat-card>
    </div>
  `,
})
export class SummaryStepComponent {
  formGroup = input.required<FormGroup>();

  personalInfo = computed(() => this.formGroup()?.get('personal')?.value);
  residentialInfo = computed(() => this.formGroup()?.get('residential')?.value);
  professionalInfo = computed(() => this.formGroup()?.get('professional')?.value);

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatSalary(salary: any): string {
    if (!salary) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(salary);
  }
}

export default SummaryStepComponent;