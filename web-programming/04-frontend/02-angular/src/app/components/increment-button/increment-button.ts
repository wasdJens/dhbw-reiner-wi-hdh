import { Component, output } from '@angular/core';

@Component({
  selector: 'app-increment-button',
  imports: [],
  templateUrl: './increment-button.html',
  styleUrl: './increment-button.css',
})
export class IncrementButton {
  increment = output();

  handleClick() {
    this.increment.emit();
  }
}
