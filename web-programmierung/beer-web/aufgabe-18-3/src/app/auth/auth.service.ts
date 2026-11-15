import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, of, shareReplay, switchMap, tap } from 'rxjs';
import { AuthApi } from './auth.api';
import { Credentials, User } from './user';

const TOKEN_KEY = 'beer-web.token';

// Anmeldung im Client: Token und User als Signal.
// Das Token liegt in sessionStorage, damit ein Neuladen die Anmeldung behält.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApi);
  private userRequest: Observable<User | null> | null = null;

  readonly token = signal<string | null>(sessionStorage.getItem(TOKEN_KEY));
  readonly user = signal<User | null>(null);
  readonly isAdmin = computed(() => this.user()?.isAdmin ?? false);

  login(credentials: Credentials): Observable<User> {
    return this.api.login(credentials).pipe(
      tap((token) => {
        sessionStorage.setItem(TOKEN_KEY, token);
        this.token.set(token);
      }),
      // Name und Rollen stehen in GET /users/me
      switchMap(() => this.api.me()),
      tap((user) => this.user.set(user)),
    );
  }

  // POST /auth/register gibt kein Token: danach anmelden
  register(credentials: Credentials): Observable<User> {
    return this.api.register(credentials).pipe(switchMap(() => this.login(credentials)));
  }

  // User zum gespeicherten Token; App und adminGuard teilen sich eine Anfrage
  loadUser(): Observable<User | null> {
    if (this.user() || !this.token()) {
      return of(this.user());
    }
    this.userRequest ??= this.api.me().pipe(
      tap((user) => this.user.set(user)),
      catchError(() => of(null)),
      shareReplay(1),
    );
    return this.userRequest;
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    this.user.set(null);
    this.userRequest = null;
  }
}
