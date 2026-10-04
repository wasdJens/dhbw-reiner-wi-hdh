import { Component, input, output } from '@angular/core';
import { SlicePipe } from '@angular/common';
import type { Client } from '../../../types';

@Component({
  selector: 'app-client-card',
  imports: [SlicePipe],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css',
})
export class ClientCardComponent {
  client = input.required<Client>();
  viewDetails = output<string>();
}
