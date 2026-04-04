/**
 * TextArea – Mehrzeiliges Eingabefeld mit Label und Fehlermeldung
 *
 * DUMB COMPONENT: Nutzt model() für Two-Way-Binding.
 *
 * Angular-Konzepte: model(), input(), @if
 */

import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
})
export class TextAreaComponent {
  label = input.required<string>();
  value = model('');
  placeholder = input('');
  rows = input(4);
  error = input('');
  required = input(false);
}
