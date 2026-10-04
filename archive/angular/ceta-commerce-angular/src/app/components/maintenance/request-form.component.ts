/**
 * RequestForm – Formular für neue Wartungsanfrage
 *
 * DUMB COMPONENT: Zeigt das Formular an und gibt die Daten beim Absenden
 * über den submit-Output nach oben. Die Validierungslogik lebt hier,
 * da sie rein UI-bezogen ist.
 *
 * Angular-Konzepte: signal(), input(), output(), model()-ähnlich via signal
 */

import { Component, input, output, signal } from '@angular/core';
import { InputComponent } from '../ui/input.component';
import { SelectComponent } from '../ui/select.component';
import { TextAreaComponent } from '../ui/textarea.component';
import { ButtonComponent } from '../ui/button.component';

export interface RequestFormData {
  productId: string;
  productName: string;
  variantTier: 'basic' | 'pro' | 'enterprise';
  description: string;
  priority: 'low' | 'medium' | 'high';
  contactEmail: string;
}

@Component({
  selector: 'app-request-form',
  imports: [InputComponent, SelectComponent, TextAreaComponent, ButtonComponent],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css',
})
export class RequestFormComponent {
  productOptions = input.required<{ value: string; label: string }[]>();
  formSubmit = output<RequestFormData>();

  // Formular-State als Signals
  productId = signal('');
  variantTier = signal('');
  description = signal('');
  priority = signal('');
  contactEmail = signal('');
  errors = signal<Record<string, string>>({});

  getError(key: string): string {
    return this.errors()[key] ?? '';
  }

  readonly variantOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  readonly priorityOptions = [
    { value: 'low', label: 'Niedrig – Kann warten' },
    { value: 'medium', label: 'Mittel – Sollte bald behoben werden' },
    { value: 'high', label: 'Hoch – Beeinträchtigt den Betrieb' },
  ];

  private validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!this.productId()) newErrors['productId'] = 'Bitte wählen Sie ein Produkt';
    if (!this.variantTier()) newErrors['variantTier'] = 'Bitte wählen Sie eine Variante';
    if (!this.description().trim()) newErrors['description'] = 'Bitte beschreiben Sie das Problem';
    if (!this.priority()) newErrors['priority'] = 'Bitte wählen Sie eine Priorität';
    if (!this.contactEmail().trim())
      newErrors['contactEmail'] = 'Bitte geben Sie eine E-Mail-Adresse an';
    else if (!this.contactEmail().includes('@'))
      newErrors['contactEmail'] = 'Bitte geben Sie eine gültige E-Mail-Adresse an';

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.validate()) return;

    const selectedProduct = this.productOptions().find((p) => p.value === this.productId());

    this.formSubmit.emit({
      productId: this.productId(),
      productName: selectedProduct?.label ?? '',
      variantTier: this.variantTier() as 'basic' | 'pro' | 'enterprise',
      description: this.description().trim(),
      priority: this.priority() as 'low' | 'medium' | 'high',
      contactEmail: this.contactEmail().trim(),
    });
  }
}
