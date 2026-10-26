import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsGateway } from './ratings.gateway';
import { RatingsService } from './ratings.service';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    // Nur der Service ist echt; Datenbank, Gateway und Events sind ersetzt
    const moduleRef = await Test.createTestingModule({
      providers: [
        RatingsService,
        {
          provide: getRepositoryToken(Rating),
          useValue: {
            findBy: () =>
              Promise.resolve([{ score: 4 }, { score: 4 }, { score: 5 }]),
          },
        },
        { provide: RatingsGateway, useValue: {} },
        { provide: EventEmitter2, useValue: {} },
      ],
    }).compile();
    service = moduleRef.get(RatingsService);
  });

  // R5: Normal: 4, 4 und 5 → 4.3
  it('rundet den Durchschnitt auf eine Nachkommastelle', async () => {
    expect(await service.averageFor(1)).toBe(4.3);
  });
});
