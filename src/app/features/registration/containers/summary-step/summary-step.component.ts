import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RegistrationFormService } from '../../services/registration-form.service';

@Component({
  selector: 'app-summary-step',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
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

      <div class="flex justify-center gap-4 mt-6">
        <button mat-button (click)="goBack()">Voltar ao Formulário</button>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!isFormValid()"
          (click)="exportToPDF()"
          class="px-8 py-2"
        >
          <mat-icon class="mr-2">picture_as_pdf</mat-icon>
          Exportar PDF
        </button>
      </div>
    </div>
  `,
})
export class SummaryStepComponent implements OnInit, OnDestroy {
  private formService = inject(RegistrationFormService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  personalInfo = signal<any>({});
  residentialInfo = signal<any>({});
  professionalInfo = signal<any>({});
  isFormValid = signal(false);

  ngOnInit(): void {
    const form = this.formService.registrationForm;

    // Update signals with current values
    // this.personalInfo.set(form.get('personal')?.value || {});
    // this.residentialInfo.set(form.get('residential')?.value || {});
    // this.professionalInfo.set(form.get('professional')?.value || {});
    // this.isFormValid.set(form.valid);

    // // Subscribe to form changes
    // form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   this.personalInfo.set(form.get('personal')?.value || {});
    //   this.residentialInfo.set(form.get('residential')?.value || {});
    //   this.professionalInfo.set(form.get('professional')?.value || {});
    //   this.isFormValid.set(form.valid);
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  goBack(): void {
    this.router.navigate(['/registration']);
  }

  async exportToPDF(): Promise<void> {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text('Formulário de Cadastro', 20, 20);

      // Personal Info
      doc.setFontSize(16);
      doc.text('Informações Pessoais', 20, 40);
      doc.setFontSize(12);
      doc.text(
        `Nome: ${this.personalInfo().fullName || 'Não informado'}`,
        20,
        50
      );
      doc.text(
        `Data de Nascimento: ${
          this.formatDate(this.personalInfo().dateOfBirth) || 'Não informado'
        }`,
        20,
        60
      );
      doc.text(`CPF: ${this.personalInfo().cpf || 'Não informado'}`, 20, 70);
      doc.text(
        `Telefone: ${this.personalInfo().phoneNumber || 'Não informado'}`,
        20,
        80
      );

      // Residential Info
      doc.setFontSize(16);
      doc.text('Informações de Endereço', 20, 100);
      doc.setFontSize(12);
      doc.text(
        `CEP: ${this.residentialInfo().zipCode || 'Não informado'}`,
        20,
        110
      );
      doc.text(
        `Endereço: ${this.residentialInfo().address || 'Não informado'}`,
        20,
        120
      );
      doc.text(
        `Bairro: ${this.residentialInfo().neighborhood || 'Não informado'}`,
        20,
        130
      );
      doc.text(
        `Cidade: ${this.residentialInfo().city || 'Não informado'}`,
        20,
        140
      );
      doc.text(
        `Estado: ${this.residentialInfo().state || 'Não informado'}`,
        20,
        150
      );

      // Professional Info
      doc.setFontSize(16);
      doc.text('Informações Profissionais', 20, 170);
      doc.setFontSize(12);
      doc.text(
        `Profissão: ${this.professionalInfo().occupation || 'Não informado'}`,
        20,
        180
      );
      doc.text(
        `Empresa: ${this.professionalInfo().company || 'Não informado'}`,
        20,
        190
      );
      doc.text(
        `Salário: ${
          this.formatSalary(this.professionalInfo().salary) || 'Não informado'
        }`,
        20,
        200
      );

      // Save PDF
      doc.save('formulario-cadastro.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert(
        'Erro ao gerar PDF. Verifique se a biblioteca jsPDF está instalada.'
      );
    }
  }
}

export default SummaryStepComponent;
