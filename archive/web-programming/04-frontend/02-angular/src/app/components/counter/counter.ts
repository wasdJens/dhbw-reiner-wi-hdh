import { Component, signal } from '@angular/core';
import { IncrementButton } from '../increment-button/increment-button';

@Component({
  selector: 'app-counter',
  imports: [IncrementButton],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);

  handleIncrement() {
    this.count.set(this.count() + 1);
  }

  handleReset() {
    this.count.set(0);
  }
}
