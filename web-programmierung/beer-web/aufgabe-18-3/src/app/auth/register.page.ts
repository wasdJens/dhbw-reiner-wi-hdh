import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CredentialsForm } from './credentials-form';
import { Credentials } from './user';

@Component({
  selector: 'app-register-page',
  imports: [CredentialsForm, RouterLink],
  template: `
    <h1>Registrieren</h1>
    <app-credentials-form
      submitLabel="Registrieren"
      [error]="error()"
      (submitted)="register($event)"
    />
    <p>Schon registriert? <a routerLink="/login">Anmelden</a></p>
  `,
})
export class RegisterPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly error = signal<string | null>(null);

  protected register(credentials: Credentials): void {
    this.error.set(null);
    this.auth.register(credentials).subscribe({
      next: () => void this.router.navigateByUrl('/beers'),
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.error.set('Der Name ist vergeben.');
        } else if (error.status === 400) {
          this.error.set('Bitte prüfe deine Eingaben.');
        }
      },
    });
  }
}
