import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoChartWorldComponent } from './geo-chart-world.component';

describe('GeoChartWorldComponent', () => {
  let component: GeoChartWorldComponent;
  let fixture: ComponentFixture<GeoChartWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoChartWorldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoChartWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
