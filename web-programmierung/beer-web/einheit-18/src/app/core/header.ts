import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <a routerLink="/beers" class="wordmark">Beer App</a>
      <nav>
        <a routerLink="/beers" routerLinkActive="active">Biere</a>
        <a routerLink="/breweries" routerLinkActive="active">Brauereien</a>
      </nav>
      <div class="user">
        @if (auth.user(); as user) {
          <a routerLink="/my-ratings" routerLinkActive="active">Meine Bewertungen</a>
          <span>{{ user.name }} ({{ user.roles.join(', ') }})</span>
          <button type="button" class="link" (click)="logout()">Abmelden</button>
        } @else {
          <a routerLink="/login" routerLinkActive="active">Anmelden</a>
          <a routerLink="/register" routerLinkActive="active">Registrieren</a>
        }
      </div>
    </header>
  `,
})
export class Header {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/beers');
  }
}
