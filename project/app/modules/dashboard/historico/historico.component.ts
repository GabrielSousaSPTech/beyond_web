import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardKpiComponent } from '../components/card-kpi/card-kpi.component';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { LineChartComponent } from "../components/line-chart/line-chart.component";
import { DataHistoricoService } from '../services/dataHistorico.service';
import { BasicDataService } from '../../../core/services/basicData/basicData.service';
import { HistoricoInputFilterComponent } from "../components/historico-input-filter/historico-input-filter/historico-input-filter.component";
import { map } from 'rxjs';
import { lineChartYear } from '../../../shared/models/line-chart-year.type';

@Component({
  selector: 'app-painel-de-controle-historico',
  imports: [CommonModule, CardKpiComponent, LineChartComponent, HistoricoInputFilterComponent],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css',
  providers: [DataHistoricoService, BasicDataService]
})
export class HistoricoComponent implements OnInit {
  protected dataHistoricoService = inject(DataHistoricoService);
  private basicDataService = inject(BasicDataService);
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Histórico de Chegadas de Turistas');
  }

  graphRules = map((data: lineChartYear[]) => {
    const distinctMonths = [...new Set(data.map(item => item.MES))].sort((a, b) => a - b);
    const anos = [...new Set(data.map(x=>x.ANO))]
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];

    const headerRow = [
      'Mês',
      ...anos.map(year => year.toString())
    ];

    const result = distinctMonths.map(month=>{
      const monthName: (string | number) = months[month - 1];
      const total: number[] = anos.map(ano =>
        data.filter(d => d.ANO == ano && d.MES == month)
          .map(d=>Number(d.TOTAL_CHEGADAS))
          .reduce((acc, ccu)=>acc+ccu, 0)
      );

      return [monthName, ...total]
    }) 
    
    return [headerRow,...result];
  })

  graphHistorico$ = this.dataHistoricoService.getLineChartAll().pipe(this.graphRules)

}


