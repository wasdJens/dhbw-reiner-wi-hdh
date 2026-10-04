import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFooter } from './card-footer';

describe('CardFooter', () => {
  let component: CardFooter;
  let fixture: ComponentFixture<CardFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
