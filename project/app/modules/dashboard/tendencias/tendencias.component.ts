import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { ComboChartAllComponent } from "../components/combo-chart-all/combo-chart-all.component";
import { BarChartAllComponent } from "../components/bar-chart-all/bar-chart-all.component";
import { CardKpiComponent } from "../components/card-kpi/card-kpi.component";
import { InputFilterComponent } from "../components/input-filter/input-filter.component";
import { DataService } from '../services/data.service';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';
import { BasicDataService } from '../../../core/services/basicData/basicData.service';
import { userFilter } from '../../../shared/models/user-filter.type';

@Component({
  selector: 'app-tendencias',
  imports: [ComboChartAllComponent, BarChartAllComponent, CardKpiComponent, InputFilterComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css',
  providers: [DataService, BasicDataService]
})
export class TendenciasComponent implements OnInit {
  dataService = inject(DataService);
  constructor(public headerTitleService: HeaderTitleService) { }

  @ViewChild('inputFilter') inputFilter!: InputFilterComponent;

  protected filterName: WritableSignal<string> = signal('');

  mes = signal<string>(this.getMesNome(new Date().getMonth() + 1));

  protected readonly anoVariacao = signal<number>(0);

  private filter = sessionStorage.getItem('filter') ? JSON.parse(sessionStorage.getItem('filter')!) : '';

  onFilterChange(){
    if(sessionStorage.getItem('filter') && Object.keys(JSON.parse(sessionStorage.getItem('filter')!)).length > 0) {
      this.dataService.updateFilter(JSON.parse(sessionStorage.getItem('filter')!) as userFilter);
    } else {
      this.dataService.updateFilter({} as userFilter);
    }
    
  }

  excluir(){
    sessionStorage.setItem('filter', JSON.stringify({} as userFilter));
    this.dataService.updateFilter({} as userFilter);
    this.filterName.set('');
    this.mes.set(this.getMesNome(new Date().getMonth() + 1));
    this.anoVariacao.set(new Date().getFullYear());
    this.inputFilter.resetFilters();
    this.onFilterChange();
  }

  getMesNome(mes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes - 1];
  }

  kpiVariacaoAno$ = this.dataService.getKpiVariacaoAno().pipe(
    tap(data => this.anoVariacao.set(data[0]?.ano)),
    map(data => data[0]?.variacao_percentual ?
      (data[0].variacao_percentual > 0 ? `+${data[0].variacao_percentual}%` : `-${data[0].variacao_percentual}%`)
      : '0.00%'),
  );

  kpiTotal$ = this.dataService.getKpiTotal().pipe(
    map(data => data[0]?.TOTAL_CHEGADAS ? data[0].TOTAL_CHEGADAS.toString() : '0'),
  );

  kpiVariacaoMes$ = this.dataService.getKpiVariacaoMes().pipe(
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

  barChartAll$ = this.dataService.getBarChartAll().pipe(this.headerMaker);

  barChartPais$ = this.dataService.getBarChartPais().pipe(map(data => data.map(item => [item.PAIS, Number(item.TOTAL_CHEGADAS)])));

  ngOnInit(): void {
    if(sessionStorage.getItem('filter')) {
      this.dataService.updateFilter(JSON.parse(sessionStorage.getItem('filter')!) as userFilter);
      this.filterName.set((JSON.parse(sessionStorage.getItem('filter')!) as userFilter).NOME)
    }
    this.headerTitleService.setTitle('Tendências de Chegadas de Turistas');
  }
}
