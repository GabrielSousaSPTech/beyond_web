import { Component } from '@angular/core';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { ComboChartAllComponent } from "../components/combo-chart-all/combo-chart-all.component";
import { BarChartAllComponent } from "../components/bar-chart-all/bar-chart-all.component";
import { GeoChartWorldComponent } from "../components/geo-chart-world/geo-chart-world.component";
import { GeoChartBrazilComponent } from "../components/geo-chart-brazil/geo-chart-brazil.component";
import { CardKpiComponent } from "../components/card-kpi/card-kpi.component";
import { InputFilterComponent } from "../components/input-filter/input-filter.component";

@Component({
  selector: 'app-tendencias',
  imports: [ComboChartAllComponent, BarChartAllComponent, CardKpiComponent, InputFilterComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent {
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Painel de controle');

  }
}
