import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-logo',
  imports: [NgOptimizedImage, MatRippleModule],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  title = input<string>('Admin Wizard');
  logoClick = output<void>();

  onLogoClick(): void {
    this.logoClick.emit();
  }
}
