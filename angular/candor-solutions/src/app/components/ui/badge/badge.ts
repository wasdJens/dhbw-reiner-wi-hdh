import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  label = input.required<string>();
  variant = input<'default' | 'success' | 'warning' | 'error' | 'info'>('default');
}
