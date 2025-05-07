import { Component, OnInit } from '@angular/core';
import { GeoChartWorldComponent } from "../components/charts/geo-chart-world/geo-chart-world.component";
import { GeoChartBrazilComponent } from "../components/charts/geo-chart-brazil/geo-chart-brazil.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-heatmap',
  imports: [GeoChartWorldComponent, GeoChartBrazilComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css'
})
export class HeatmapComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Mapa de Calor');
  }
}
