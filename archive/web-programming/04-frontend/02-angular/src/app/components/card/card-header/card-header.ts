import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  imports: [],
  templateUrl: './card-header.html',
  styleUrl: './card-header.css',
})
export class CardHeader {
  title = input.required<string>();
  subTitle = input<string>();
}
