import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { GeoChartWorldComponent } from "../components/geo-chart-world/geo-chart-world.component";
import { GeoChartBrazilComponent } from "../components/geo-chart-brazil/geo-chart-brazil.component";
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { BarChartAllComponent } from "../components/bar-chart-all/bar-chart-all.component";
import { DataService } from '../services/dataTendencia.service';
import { map } from 'rxjs';
import { BasicDataService } from '../../../core/services/basicData/basicData.service';
import { UserFiltersService } from '../../../core/services/user-filters/user-filters.service';
import countries from '../../../shared/models/paises-ingles';

@Component({
  selector: 'app-heatmap',
  imports: [GeoChartWorldComponent, GeoChartBrazilComponent, BarChartAllComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css',
  providers: [DataService, BasicDataService, UserFiltersService]
})
export class HeatmapComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }

  protected mapaBrasilMostrar: WritableSignal<boolean> = signal(true)
  protected titulo: WritableSignal<string> = signal("Fluxo de turístas nos estados brasileiros")
  protected botaoHeatMap: WritableSignal<string> = signal("Ver Países de Origem")
  protected ranking: WritableSignal<string> = signal("Ranking estados mais visitados")
  trocarHeatMap() {
    if (this.mapaBrasilMostrar()) {
      this.mapaBrasilMostrar.set(false)
      this.titulo.set("Países de Origem dos Turistas no Brasil")
      this.botaoHeatMap.set("Ver Turismo por Estado")
      this.ranking.set("Ranking países de origem")

    } else {
      this.mapaBrasilMostrar.set(true)
      this.titulo.set("Fluxo de turístas nos estados brasileiros")
      this.botaoHeatMap.set("Ver Países de Origem")
      this.ranking.set("Ranking estados mais visitados")
    }
  }

  dataService = inject(DataService);
  barChartPais$ = this.dataService.getBarChartPais().pipe(map(data => data.map(item => [item.PAIS, Number(item.TOTAL_CHEGADAS)])));
  geoChartPais$ = this.dataService.getBarChartPais().pipe(map(data => data.map(item => [countries[item.PAIS], Number(item.TOTAL_CHEGADAS)])));
  barChartUF$ = this.dataService.getBarChartUF().pipe(map(data => data.map(item => [item.FEDERACAO_BRASIL, Number(item.TOTAL_CHEGADAS)])));



  ngOnInit(): void {
    this.headerTitleService.setTitle('Mapa de Calor');
  }

}
