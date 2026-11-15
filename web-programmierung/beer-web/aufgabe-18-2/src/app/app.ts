import { Component, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Header } from './core/header';
import { MessageBar } from './core/message-bar';
import { MessageService } from './core/message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MessageBar],
  template: `
    <app-header />
    <main>
      <app-message-bar />
      <router-outlet />
    </main>
  `,
})
export class App {
  constructor() {
    const messages = inject(MessageService);
    // Eine neue Seite beginnt ohne die Meldung der alten
    inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        messages.clear();
      }
    });
    // Nach dem Neuladen: User zum Token aus sessionStorage laden
    inject(AuthService).loadUser().subscribe();
  }
}
