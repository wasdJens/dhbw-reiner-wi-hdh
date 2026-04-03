import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssIntro } from './css-intro';

describe('CssIntro', () => {
  let component: CssIntro;
  let fixture: ComponentFixture<CssIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
