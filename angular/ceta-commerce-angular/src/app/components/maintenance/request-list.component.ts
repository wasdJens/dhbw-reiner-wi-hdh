/**
 * RequestList – Liste von Wartungsanfragen
 *
 * DUMB COMPONENT: Rendert eine Liste von RequestCards.
 * Zeigt einen Empty State wenn keine Anfragen vorhanden sind.
 *
 * Angular-Konzepte: input(), @if, @for
 */

import { Component, input } from '@angular/core';
import type { MaintenanceRequest } from '../../types';
import { RequestCardComponent } from './request-card.component';

@Component({
  selector: 'app-request-list',
  imports: [RequestCardComponent],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css',
})
export class RequestListComponent {
  requests = input.required<MaintenanceRequest[]>();
}
