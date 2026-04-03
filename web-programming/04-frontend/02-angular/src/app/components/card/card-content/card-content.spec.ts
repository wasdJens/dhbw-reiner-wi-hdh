import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContent } from './card-content';

describe('CardContent', () => {
  let component: CardContent;
  let fixture: ComponentFixture<CardContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
