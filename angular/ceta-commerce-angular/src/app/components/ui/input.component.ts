/**
 * Input – Formularfeld mit Label und Fehlermeldung
 *
 * DUMB COMPONENT: Nutzt model() für Two-Way-Binding des Werts.
 *
 * Angular-Konzepte: model(), input(), @if
 */

import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  label = input.required<string>();
  value = model('');
  placeholder = input('');
  type = input('text');
  error = input('');
  required = input(false);
}
