import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboChartAllComponent } from './combo-chart-all.component';

describe('ComboChartAllComponent', () => {
  let component: ComboChartAllComponent;
  let fixture: ComponentFixture<ComboChartAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboChartAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboChartAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
