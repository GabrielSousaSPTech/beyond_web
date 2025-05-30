import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderTitleService } from '../../../core/services/header-title/header-title.service';
import { ComboChartAllComponent } from "../components/combo-chart-all/combo-chart-all.component";
import { BarChartAllComponent } from "../components/bar-chart-all/bar-chart-all.component";
import { CardKpiComponent } from "../components/card-kpi/card-kpi.component";
import { InputFilterComponent } from "../components/tendencia-input-filter/tendencia-input-filter.component";
import { DataService } from '../services/dataTendencia.service';
import { AsyncPipe } from '@angular/common';
import { map, take, tap } from 'rxjs';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';
import { BasicDataService } from '../../../core/services/basicData/basicData.service';
import { userFilter } from '../../../shared/models/user-filter.type';
import { UserFiltersService } from '../../../core/services/user-filters/user-filters.service';
import { FilterPopupComponent } from "../components/filter-popup/filter-popup.component";

@Component({
  selector: 'app-tendencias',
  imports: [ComboChartAllComponent, BarChartAllComponent, CardKpiComponent, InputFilterComponent, FilterPopupComponent],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css',
  providers: [DataService, BasicDataService, UserFiltersService]
})
export class TendenciasComponent implements OnInit {
  dataService = inject(DataService);
  filterService = inject(UserFiltersService);

  protected showPopUpFilter = signal(false);

  popUp(){
    if(this.showPopUpFilter()){
      this.showPopUpFilter.set(false);
    } else {
      this.showPopUpFilter.set(true);
    }
    
  }

  constructor(public headerTitleService: HeaderTitleService) { }

  @ViewChild('inputFilter') inputFilter!: InputFilterComponent;

  protected filterName: WritableSignal<string> = signal('');

  mes = signal<string>(this.getMesNome(new Date().getMonth() + 1));

  protected readonly anoVariacao = signal<number>(0);

  onFilterChange(){
    if(sessionStorage.getItem('filter') && Object.keys(JSON.parse(sessionStorage.getItem('filter')!)).length > 0) {
      this.filterService.setActiveFilter(JSON.parse(sessionStorage.getItem('filter')!))
      this.filterName.set((JSON.parse(sessionStorage.getItem('filter')!) as userFilter).NOME)
    } else {
      this.filterService.setActiveFilter(JSON.parse(sessionStorage.getItem('filter')!))
    }
  }

  onFilterNameChange(event: any) {
    const name = (event.target as HTMLInputElement).value;
    const currentFilter = JSON.parse(sessionStorage.getItem('filter')!) as userFilter;
    currentFilter.NOME = name;
    if(name.trim() === ''){
      currentFilter.ID_FILTRO = 0;
    }
    this.filterService.setActiveFilter(currentFilter);
  }

  excluir(){
    this.filterService.clearActiveFilter();
    this.filterName.set('');
    this.mes.set(this.getMesNome(new Date().getMonth() + 1));
    this.anoVariacao.set(new Date().getFullYear() - 1);
    this.inputFilter.resetFilters();
    this.onFilterChange();
  }

  salvar() {
    if(sessionStorage.getItem('filter')) {
      const currentFilter = JSON.parse(sessionStorage.getItem('filter')!) as userFilter;
      if (currentFilter.NOME && currentFilter.NOME.trim() !== '') {
        if(currentFilter.ID_FILTRO === 0) {
          this.filterService.addUserFilter(currentFilter).subscribe({
            next: (response: any) => {
              currentFilter.ID_FILTRO = response.insertId;
              sessionStorage.setItem('filter', JSON.stringify(currentFilter));
              this.filterName.set(currentFilter.NOME);
            }
          })
        } else {
          this.filterService.updateUserFilter(currentFilter).subscribe();
        }
        this.filterService.setActiveFilter(currentFilter);
      } 
    }
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
      (data[0].variacao_percentual > 0 ? `+${data[0].variacao_percentual}%` : `${data[0].variacao_percentual}%`)
      : '0.00%'),
  );

  kpiTotal$ = this.dataService.getKpiTotal().pipe(
    map(data => data[0]?.TOTAL_CHEGADAS ? Number(data[0].TOTAL_CHEGADAS).toLocaleString('pt-BR') : '0'),
  );

  kpiVariacaoMes$ = this.dataService.getKpiVariacaoMes().pipe(
    map(data => data[0]?.variacao_percentual ?
      (data[0].variacao_percentual > 0 ? `+${data[0].variacao_percentual}%` : `${data[0].variacao_percentual}%`)
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
    this.headerTitleService.setTitle('Tendências de Chegadas de Turistas');
    this.filterService.activeFilter$.subscribe(filter=> {
      this.filterName.set(filter.NOME)
      let mes = this.getMesNome(Number(filter.DATA_CHEGADA!.substring(5,7)));
      this.mes.set(mes ? mes : this.getMesNome(new Date().getMonth() + 1));
    });
  }
}
