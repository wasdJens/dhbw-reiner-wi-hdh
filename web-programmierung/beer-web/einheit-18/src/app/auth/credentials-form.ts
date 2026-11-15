import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credentials } from './user';

@Component({
  selector: 'app-credentials-form',
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="submitted.emit({ name, password })">
      <label>
        Name
        <input name="name" [(ngModel)]="name" required autocomplete="username" />
      </label>
      <label>
        Passwort
        <input
          name="password"
          type="password"
          [(ngModel)]="password"
          required
          autocomplete="current-password"
        />
      </label>
      @if (error()) {
        <p class="form-error">{{ error() }}</p>
      }
      <button type="submit" [disabled]="form.invalid">{{ submitLabel() }}</button>
    </form>
  `,
})
export class CredentialsForm {
  readonly submitLabel = input.required<string>();
  readonly error = input<string | null>(null);
  readonly submitted = output<Credentials>();

  protected name = '';
  protected password = '';
}
