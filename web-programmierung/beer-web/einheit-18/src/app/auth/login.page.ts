import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CredentialsForm } from './credentials-form';
import { Credentials } from './user';

@Component({
  selector: 'app-login-page',
  imports: [CredentialsForm, RouterLink],
  template: `
    <h1>Anmelden</h1>
    <app-credentials-form submitLabel="Anmelden" [error]="error()" (submitted)="login($event)" />
    <p>Noch kein Konto? <a routerLink="/register">Registrieren</a></p>
  `,
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly error = signal<string | null>(null);

  protected login(credentials: Credentials): void {
    this.error.set(null);
    this.auth.login(credentials).subscribe({
      next: () => void this.router.navigateByUrl('/beers'),
      // 401 beim Login ist ein fachlicher Fall: Meldung im Formular, keine Umleitung
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.error.set('Name oder Passwort ist falsch.');
        } else if (error.status === 400) {
          this.error.set('Bitte prüfe deine Eingaben.');
        }
      },
    });
  }
}
