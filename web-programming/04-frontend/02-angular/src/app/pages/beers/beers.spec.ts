import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beers } from './beers';

describe('Beers', () => {
  let component: Beers;
  let fixture: ComponentFixture<Beers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
