import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersServer } from './beers-server';

describe('BeersServer', () => {
  let component: BeersServer;
  let fixture: ComponentFixture<BeersServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeersServer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeersServer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
