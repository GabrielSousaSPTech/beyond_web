import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { ComboChartAllComponent } from "../components/combo-chart-all/combo-chart-all.component";
import { BarChartAllComponent } from "../components/bar-chart-all/bar-chart-all.component";
import { CardKpiComponent } from "../components/card-kpi/card-kpi.component";
import { InputFilterComponent } from "../components/input-filter/input-filter.component";
import { DataService } from '../services/data.service';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';

@Component({
  selector: 'app-tendencias',
  imports: [ComboChartAllComponent, BarChartAllComponent, CardKpiComponent, InputFilterComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css',
  providers: [DataService]
})
export class TendenciasComponent implements OnInit {
  dataService = inject(DataService);
  constructor(public headerTitleService: HeaderTitleService) { }

  mes = signal<string>(this.getMesNome(new Date().getMonth() + 1));

  protected readonly anoVariacao = signal<number>(0);

  private filter = sessionStorage.getItem('filter') ? JSON.parse(sessionStorage.getItem('filter')!) : '';


  getMesNome(mes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  }

  kpiVariacaoAno$ = this.dataService.getKpiVariacaoAno(this.filter).pipe(
    tap(data => this.anoVariacao.set(data[0]?.ano)),
    map(data => data[0]?.variacao_percentual ?
      (data[0].variacao_percentual > 0 ? `+${data[0].variacao_percentual}%` : `-${data[0].variacao_percentual}%`)
      : '0.00%'),
  );

  kpiTotal$ = this.dataService.getKpiTotal(this.filter).pipe(
    map(data => data[0]?.TOTAL_CHEGADAS ? data[0].TOTAL_CHEGADAS.toString() : '0'),
  );

  kpiVariacaoMes$ = this.dataService.getKpiVariacaoMes(this.filter).pipe(
    map(data => data[0]?.variacao_percentual ?
      (data[0].variacao_percentual > 0 ? `+${data[0].variacao_percentual}%` : `-${data[0].variacao_percentual}%`)
      : '0.00%'),
  );

  private headerMaker = map((data: BarChartAll[]) => {
    const distinctMonths = [...new Set(data.map(item => item.MES))].sort((a, b) => a - b);
    const continents = [...new Set(data.map(item => item.CONTINENTE))];

    const headerRow = [
      "Month",
      ...continents,
      "TOTAL"
    ];

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

    const monthRows = distinctMonths.map(month => {
      const row: (string | number)[] = [months[month - 1]];
      continents.forEach(continent => {
        const continentData = data.find(item =>
          item.MES === month && item.CONTINENTE === continent
        );
        row.push(continentData ? Number(continentData.TOTAL_CHEGADAS) : 0);
      });

      const monthlyTotal = data.find(item => item.MES === month)?.TOTAL_MENSAL || 0;
      row.push(Number(monthlyTotal));

      return row;
    });

    return [
      headerRow,
      ...monthRows
    ];
  });

  barChartAll$ = this.dataService.getBarChartAll(this.filter).pipe(this.headerMaker);

  barChartPais$ = this.dataService.getBarChartPais(this.filter).pipe(map(data => data.map(item => [item.PAIS, Number(item.TOTAL_CHEGADAS)])));

  ngOnInit(): void {
    console.log("filtro:", this.filter)
    this.headerTitleService.setTitle('Tendências de Chegadas de Turistas');
  }
}
