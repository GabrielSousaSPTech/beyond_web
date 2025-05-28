import { Component, EventEmitter, inject, OnInit, Output, Signal, signal } from '@angular/core';
import { BasicDataService } from '../../../../core/services/basicData/basicData.service';
import { SelectFilteredComponent } from "../select-filtered/select-filtered/select-filtered.component";
import { firstValueFrom, map, Observable, of, startWith, switchMap, take, tap } from 'rxjs';
import { userFilter } from '../../../../shared/models/user-filter.type';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pais } from '../../../../shared/models/basic-data.type';
import { UserFiltersService } from '../../../../core/services/user-filters/user-filters.service';

@Component({
  selector: 'app-input-filter',
  imports: [SelectFilteredComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
  providers: []
})
export class InputFilterComponent implements OnInit {
  protected basicDataService = inject(BasicDataService);
  private filterService = inject(UserFiltersService);
  @Output() filterChange = new EventEmitter<object>();
  protected filterForm: FormGroup;

  protected paisesFiltered$: Observable<Pais[]> = of([]);

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      continente: [''],
      via: [''],
      ano: [''],
      pais: [''],
      federacao: [''],
      mes: ['']
    });

    this.paisesFiltered$ = this.filterForm.get('continente')!.valueChanges.pipe(
      startWith(''),
      switchMap(continente =>
        this.basicDataService.paises$.pipe(
          map(paises => {
            if (!continente) return paises;
            return paises.filter(pais =>
              pais.fk_continente === this.basicDataService.getContinenteByName(continente)?.id
            );
          })
        )
      )
    );

    this.filterForm.valueChanges.subscribe(formValues => {
      this.handleFilterChanges(formValues);
    });

    this.filterService.activeFilter$.subscribe(filter => {
      this.updateForm(filter);
    })
  }



  private mesesList = [{ id: 1, mes: 'Janeiro' },
  { id: 2, mes: 'Fevereiro' },
  { id: 3, mes: 'Março' },
  { id: 4, mes: 'Abril' },
  { id: 5, mes: 'Maio' },
  { id: 6, mes: 'Junho' },
  { id: 7, mes: 'Julho' },
  { id: 8, mes: 'Agosto' },
  { id: 9, mes: 'Setembro' },
  { id: 10, mes: 'Outubro' },
  { id: 11, mes: 'Novembro' },
  { id: 12, mes: 'Dezembro' }]

  protected meses$: Observable<{ id: number; mes: string }[]> = of(this.mesesList);

  async ngOnInit() {
    if (sessionStorage.getItem('filter')) {
      while (!this.basicDataService.isLoaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const filter: userFilter = JSON.parse(sessionStorage.getItem('filter')!);

      this.updateForm(filter);
    }
  }

  private async updateForm(filter: userFilter) {
    while (!this.basicDataService.isLoaded) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    this.filterForm.patchValue({
      continente: filter.FK_CONTINENTE ? this.basicDataService.getContinenteById(filter.FK_CONTINENTE!)?.nome : '',
      via: filter.FK_VIA ? this.basicDataService.getViaById(filter.FK_VIA)!.tipo : '',
      ano: filter.DATA_CHEGADA ? filter.DATA_CHEGADA.substring(0, 4) : "",
      pais: filter.FK_PAIS ? this.basicDataService.getPaisById(filter.FK_PAIS)!.nome : '',
      federacao: filter.FK_FEDERACAO_BRASIL ? this.basicDataService.getFederacaoBrasilById(filter.FK_FEDERACAO_BRASIL!)!.nome : '',
      mes: filter.DATA_CHEGADA ? this.mesesList.find(x => x.id == Number(filter.DATA_CHEGADA!.substring(5, 7)))?.mes : ""
    });
  }

  private handleFilterChanges(formValues: any) {
    this.filterService.activeFilter$.pipe(
      take(1)
    ).subscribe(currentFilter => {
      const newFilter: userFilter = {
        ID_FILTRO: currentFilter?.ID_FILTRO || 0,
        FK_EMPRESA: Number(sessionStorage.getItem('EMPRESA_USUARIO')!),
        NOME: currentFilter?.NOME || '',
        FK_CONTINENTE: formValues.continente ? this.basicDataService.getContinenteByName(formValues.continente)!.id : undefined,
        FK_VIA: formValues.via ? this.basicDataService.getViaByName(formValues.via)?.id : undefined,
        FK_PAIS: formValues.pais ? this.basicDataService.getPaisByName(formValues.pais)?.id : undefined,
        FK_FEDERACAO_BRASIL: formValues.federacao ? this.basicDataService.getFederacaoBrasilByName(formValues.federacao)?.id : undefined,
        DATA_CHEGADA: formValues.ano ?
          (formValues.mes ?
            `${formValues.ano}-${(this.mesesList.find(x => x.mes === formValues.mes)?.id || 12).toString().padStart(2, '0')}-01` :
            `${formValues.ano}-12-01`) :
          undefined
      };

      if (!this.isFilterEqual(currentFilter, newFilter)) {
        this.filterService.setActiveFilter(newFilter);
        this.filterChange.emit();
      }
    });
  }

  private isFilterEqual(filter1?: userFilter, filter2?: userFilter): boolean {
    if (!filter1 || !filter2) return false;

    return filter1.FK_CONTINENTE === filter2.FK_CONTINENTE &&
      filter1.FK_VIA === filter2.FK_VIA &&
      filter1.FK_PAIS === filter2.FK_PAIS &&
      filter1.FK_FEDERACAO_BRASIL === filter2.FK_FEDERACAO_BRASIL &&
      filter1.DATA_CHEGADA === filter2.DATA_CHEGADA;
  }

  resetFilters() {
    this.filterForm.reset();
  }
}
