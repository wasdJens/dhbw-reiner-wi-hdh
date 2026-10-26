import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

// Inhalt des Events rating.created
type RatingCreatedEvent = { beerId: number; score: number };

@Injectable()
export class RatingCreatedListener {
  private readonly logger = new Logger(RatingCreatedListener.name);

  // Läuft nach jeder Bewertung; RatingsService kennt diese Klasse nicht
  @OnEvent('rating.created')
  handle(event: RatingCreatedEvent) {
    this.logger.log(`Bier ${event.beerId} bewertet mit ${event.score}`);
  }
}
