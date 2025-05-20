import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardKpiComponent } from '../components/card-kpi/card-kpi.component';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { LineChartComponent } from "../components/line-chart/line-chart.component";

@Component({
  selector: 'app-painel-de-controle-historico',
  imports: [CommonModule, CardKpiComponent, LineChartComponent],
  templateUrl: './painel-de-controle-historico.component.html',
  styleUrl: './painel-de-controle-historico.component.css'
})
export class PainelDeControleHistoricoComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Painel de controle');
  }

}


