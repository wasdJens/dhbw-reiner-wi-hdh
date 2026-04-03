import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BeerResponseDto, UpdateBeerDto } from '../../definitions/beer-api.interface';
import { BeersService } from '../../services/beers-service';

@Component({
  selector: 'app-beer-detail-page',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatProgressBarModule,
    DecimalPipe
],
  templateUrl: './beer-detail-page.html',
  styleUrl: './beer-detail-page.scss',
})
export class BeerDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly beersService = inject(BeersService);

  readonly beer = computed(() => this.data()!['beer'] as BeerResponseDto);

  readonly tasteOptions = ['Pils', 'IPA', 'Weizen', 'Helles', 'Stout', 'Bock', 'Craft Mix'];

  readonly detailForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    brand: ['', [Validators.required, Validators.maxLength(120)]],
    taste: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0)]],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  });

  readonly isSaving = signal(false);
  readonly saveMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => {
      const beer = this.beer();
      if (beer) {
        this.detailForm.reset({
          name: beer.name,
          brand: beer.brand,
          taste: beer.taste,
          amount: beer.amount,
          rating: beer.rating,
        });
        this.saveMessage.set(null);
        this.errorMessage.set(null);
      }
    });
  }

  async save() {
    if (this.detailForm.invalid || this.isSaving()) {
      this.detailForm.markAllAsTouched();
      return;
    }

    const beer = this.beer();
    if (!beer) {
      return;
    }

    this.isSaving.set(true);
    this.saveMessage.set(null);
    this.errorMessage.set(null);

    try {
      const payload: UpdateBeerDto = this.detailForm.getRawValue();
      await this.beersService.updateBeer(beer.id, payload);
      this.saveMessage.set('Bier erfolgreich aktualisiert!');
    } catch {
      this.errorMessage.set('Aktualisierung fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
