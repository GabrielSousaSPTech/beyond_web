import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardKpiComponent } from '../components/card-kpi/card-kpi.component';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { LineChartComponent } from "../components/line-chart/line-chart.component";

@Component({
  selector: 'app-painel-de-controle-historico',
  imports: [CommonModule, CardKpiComponent, LineChartComponent],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Histórico de Chegadas de Turistas');
  }

}


