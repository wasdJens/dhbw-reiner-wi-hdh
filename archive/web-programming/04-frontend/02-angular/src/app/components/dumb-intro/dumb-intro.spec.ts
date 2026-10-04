import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbIntro } from './dumb-intro';

describe('DumbIntro', () => {
  let component: DumbIntro;
  let fixture: ComponentFixture<DumbIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DumbIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
