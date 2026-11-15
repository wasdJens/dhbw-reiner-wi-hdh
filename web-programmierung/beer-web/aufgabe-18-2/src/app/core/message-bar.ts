import { Component, inject } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-bar',
  template: `
    @if (messages.message(); as message) {
      <div class="message" [class.error]="message.kind === 'error'" role="status">
        <span>{{ message.text }}</span>
        <button type="button" class="link" (click)="messages.clear()">Schließen</button>
      </div>
    }
  `,
})
export class MessageBar {
  protected readonly messages = inject(MessageService);
}
