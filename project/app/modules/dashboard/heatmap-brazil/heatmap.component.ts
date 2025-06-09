import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { GeoChartWorldComponent } from "../components/geo-chart-world/geo-chart-world.component";
import { GeoChartBrazilComponent } from "../components/geo-chart-brazil/geo-chart-brazil.component";
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';

@Component({
  selector: 'app-heatmap',
  imports: [GeoChartWorldComponent, GeoChartBrazilComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css'
})
export class HeatmapComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }

  protected mapaBrasilMostrar:WritableSignal<boolean> = signal(true)
  protected titulo:WritableSignal<string> = signal("Fluxo de turístas nos estados brasileiros")
  protected botaoHeatMap:WritableSignal<string> = signal("Ver Países de Origem")
  protected ranking:WritableSignal<string> = signal("Ranking estados mais visitados")
  trocarHeatMap() {
    if(this.mapaBrasilMostrar()){
      this.mapaBrasilMostrar.set(false)
      this.titulo.set("Fluxo de turístas nos estados brasileiros")
      this.botaoHeatMap.set("Ver Países de Origem")
      this.ranking.set("Ranking estados mais visitados")

    } else {
      this.mapaBrasilMostrar.set(true)
      this.titulo.set("Países de Origem dos Turistas no Brasil")
      this.botaoHeatMap.set("Ver Turismo por Estado")
      this.ranking.set("Ranking países de origem")


    }
  }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Mapa de Calor');
  }

}
