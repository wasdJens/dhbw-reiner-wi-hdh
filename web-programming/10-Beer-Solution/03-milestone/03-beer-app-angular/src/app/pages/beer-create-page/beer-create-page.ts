
import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { BeerCreateDto } from '../../definitions/beer-api.interface';
import { BeersService } from '../../services/beers-service';

@Component({
  selector: 'app-beer-create-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule
],
  templateUrl: './beer-create-page.html',
  styleUrl: './beer-create-page.scss',
})
export class BeerCreatePage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly beersService = inject(BeersService);
  private readonly router = inject(Router);

  readonly tasteOptions = ['Pils', 'IPA', 'Weizen', 'Helles', 'Stout', 'Bock', 'Craft Mix'];

  readonly beerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    brand: ['', [Validators.required, Validators.maxLength(120)]],
    taste: ['', [Validators.required]],
  });

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async submit() {
    if (this.beerForm.invalid) {
      this.beerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const payload: BeerCreateDto = this.beerForm.getRawValue();
      await this.beersService.createBeer(payload);
      await this.router.navigate(['/beers']);
    } catch {
      this.errorMessage.set('Erstellen fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
