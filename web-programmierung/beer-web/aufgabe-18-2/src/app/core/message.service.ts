import { Injectable, signal } from '@angular/core';

export interface Message {
  text: string;
  kind: 'success' | 'error';
}

// Eine Meldung für die ganze Seite; die MessageBar zeigt sie an
@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly message = signal<Message | null>(null);

  success(text: string): void {
    this.message.set({ text, kind: 'success' });
  }

  error(text: string): void {
    this.message.set({ text, kind: 'error' });
  }

  clear(): void {
    this.message.set(null);
  }
}
