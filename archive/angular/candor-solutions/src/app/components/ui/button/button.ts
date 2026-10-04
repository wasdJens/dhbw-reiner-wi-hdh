import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
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
