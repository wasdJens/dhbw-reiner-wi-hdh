/**
 * Footer – Fußzeile der Anwendung
 *
 * DUMB COMPONENT: Statischer Inhalt, keine Inputs nötig.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
