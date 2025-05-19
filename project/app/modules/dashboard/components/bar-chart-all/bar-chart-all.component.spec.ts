import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartAllComponent } from './bar-chart-all.component';

describe('BarChartAllComponent', () => {
  let component: BarChartAllComponent;
  let fixture: ComponentFixture<BarChartAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
