import { Component, input } from '@angular/core';

type CardOptions = {
  elevated?: boolean;
};

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  options = input<CardOptions>({ elevated: true });
}
