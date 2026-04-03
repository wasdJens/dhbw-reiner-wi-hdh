import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetail } from './beer-detail';

describe('BeerDetail', () => {
  let component: BeerDetail;
  let fixture: ComponentFixture<BeerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
