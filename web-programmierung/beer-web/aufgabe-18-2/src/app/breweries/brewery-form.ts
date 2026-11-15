import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreweryInput } from './brewery';

@Component({
  selector: 'app-brewery-form',
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="save.emit(value)">
      <label>Name <input name="name" [(ngModel)]="value.name" required /></label>
      <label>Ort <input name="city" [(ngModel)]="value.city" required /></label>
      <label>Land <input name="country" [(ngModel)]="value.country" required /></label>
      @if (error()) {
        <p class="form-error">{{ error() }}</p>
      }
      <button type="submit" [disabled]="form.invalid">Speichern</button>
    </form>
  `,
})
export class BreweryForm implements OnInit {
  readonly initial = input.required<BreweryInput>();
  readonly error = input<string | null>(null);
  readonly save = output<BreweryInput>();

  protected value: BreweryInput = { name: '', city: '', country: '' };

  ngOnInit(): void {
    this.value = { ...this.initial() };
  }
}
