/**
 * Card – Karten-Komposition (Card, CardImage, CardBody, CardFooter)
 *
 * DUMB COMPONENT: Nutzt Content Projection (ng-content) statt children.
 *
 * Angular-Konzepte: ng-content, input()
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {}

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrl: './card.component.css',
})
export class CardImageComponent {}

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrl: './card.component.css',
})
export class CardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrl: './card.component.css',
})
export class CardFooterComponent {}
