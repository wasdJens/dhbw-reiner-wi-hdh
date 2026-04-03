import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementButton } from './increment-button';

describe('IncrementButton', () => {
  let component: IncrementButton;
  let fixture: ComponentFixture<IncrementButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
