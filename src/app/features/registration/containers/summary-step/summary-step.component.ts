import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
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
        <h3 class="text-lg font-semibold mb-4">Informações Pessoais</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Nome Completo</label>
            <p class="font-medium">
              {{ personalInfo()?.fullName || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Data de Nascimento</label>
            <p class="font-medium">
              {{ formatDate(personalInfo()?.dateOfBirth) || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">CPF</label>
            <p class="font-medium">
              {{ personalInfo()?.cpf || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Número de Telefone</label>
            <p class="font-medium">
              {{ personalInfo()?.phoneNumber || 'Não informado' }}
            </p>
          </div>
        </div>
      </mat-card>

      <mat-card class="p-6">
        <h3 class="text-lg font-semibold mb-4">Informações de Endereço</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">CEP</label>
            <p class="font-medium">
              {{ residentialInfo()?.zipCode || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Endereço</label>
            <p class="font-medium">
              {{ residentialInfo()?.address || 'Não informado' }}
            </p>
          </div>

          <div>
            <label class="text-sm text-gray-600">Bairro</label>
            <p class="font-medium">
              {{ residentialInfo()?.neighborhood || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Cidade</label>
            <p class="font-medium">
              {{ residentialInfo()?.city || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Estado</label>
            <p class="font-medium">
              {{ residentialInfo()?.state || 'Não informado' }}
            </p>
          </div>
        </div>
      </mat-card>

      <mat-card class="p-6">
        <h3 class="text-lg font-semibold mb-4">Informações Profissionais</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm text-gray-600">Profissão</label>
            <p class="font-medium">
              {{ professionalInfo()?.occupation || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Empresa</label>
            <p class="font-medium">
              {{ professionalInfo()?.company || 'Não informado' }}
            </p>
          </div>
          <div>
            <label class="text-sm text-gray-600">Salário</label>
            <p class="font-medium">
              {{ formatSalary(professionalInfo()?.salary) || 'Não informado' }}
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
  professionalInfo = computed(
    () => this.formGroup()?.get('professional')?.value
  );

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatSalary(salary: any): string {
    if (!salary) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(salary);
  }
}

export default SummaryStepComponent;
