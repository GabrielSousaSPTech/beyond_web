import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoChartBrazilComponent } from './geo-chart-brazil.component';

describe('GeoChartBrazilComponent', () => {
  let component: GeoChartBrazilComponent;
  let fixture: ComponentFixture<GeoChartBrazilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoChartBrazilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoChartBrazilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
