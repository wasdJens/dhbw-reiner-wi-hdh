import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersCreate } from './beers-create';

describe('BeersCreate', () => {
  let component: BeersCreate;
  let fixture: ComponentFixture<BeersCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeersCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeersCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
