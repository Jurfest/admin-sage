import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { LoadingStore } from './shared/stores/loading.store';
import { OccupationService } from './features/registration/services/occupation.service';

@Component({
  imports: [RouterModule, SpinnerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private loadingStore = inject(LoadingStore);
  private occupationService = inject(OccupationService);

  isLoading = computed(() => 
    this.loadingStore.isLoading() || this.occupationService.isLoading()
  );
}
