/**
 * Select – Dropdown-Auswahlfeld mit Label und Fehlermeldung
 *
 * DUMB COMPONENT: Nutzt model() für Two-Way-Binding.
 *
 * Angular-Konzepte: model(), input(), @if, @for
 */

import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  label = input.required<string>();
  value = model('');
  options = input.required<{ value: string; label: string }[]>();
  placeholder = input('');
  error = input('');
  required = input(false);
}
