import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoadingStore } from './shared/stores/loading.store';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@Component({
  imports: [RouterModule, SpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  loadingStore = inject(LoadingStore);
}
