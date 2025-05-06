import { Component } from '@angular/core';
import { GeoChartWorldComponent } from "../components/charts/geo-chart-world/geo-chart-world.component";
import { GeoChartBrazilComponent } from "../components/charts/geo-chart-brazil/geo-chart-brazil.component";

@Component({
  selector: 'app-heatmap',
  imports: [GeoChartWorldComponent, GeoChartBrazilComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css'
})
export class HeatmapComponent {

}
