// src/app/app.ts – App-Wrapper mit Header, Footer und router-outlet
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/layout/header.component";
import { FooterComponent } from "./components/layout/footer.component";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.html",
})
export class App {
  private cartService = inject(CartService);
  readonly cartItemCount = this.cartService.cartItemCount; // Signal – immer aktuell
}

<!-- app.html – Header und Footer bleiben IMMER da. Nur router-outlet wechselt. -->
<app-header [cartItemCount]="cartItemCount()" />

<router-outlet />
<!-- ↑ Hier wird die aktive Seite gerendert (statt <Routes><Route> in React) -->

<app-footer />

// src/app/app.config.ts – withComponentInputBinding() ermöglicht input() für Route-Parameter
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // withComponentInputBinding(): URL-Parameter werden direkt als input() gebunden!
  ],
};