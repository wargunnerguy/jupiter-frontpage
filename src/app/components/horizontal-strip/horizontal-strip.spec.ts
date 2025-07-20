import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalStrip } from './horizontal-strip';

describe('HorizontalStrip', () => {
  let component: HorizontalStrip;
  let fixture: ComponentFixture<HorizontalStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
