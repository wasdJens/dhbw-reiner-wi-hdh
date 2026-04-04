/**
 * Button – Wiederverwendbarer Button
 *
 * DUMB COMPONENT: Aussehen wird über input()-Signals gesteuert.
 * Klick-Events werden über output() nach oben weitergegeben.
 *
 * Angular-Konzepte: input(), output(), @if
 */

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  type = input<'button' | 'submit'>('button');
  clicked = output<void>();

  protected buttonClasses(): string {
    const classes = ['btn', `btn--${this.variant()}`];
    if (this.size() !== 'md') classes.push(`btn--${this.size()}`);
    return classes.join(' ');
  }
}
