import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondPage } from './second-page';

describe('SecondPage', () => {
  let component: SecondPage;
  let fixture: ComponentFixture<SecondPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
