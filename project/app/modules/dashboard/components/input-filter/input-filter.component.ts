import { Component, EventEmitter, inject, OnInit, Output, Signal, signal } from '@angular/core';
import { BasicDataService } from '../../../../core/services/basicData/basicData.service';
import { SelectFilteredComponent } from "../select-filtered/select-filtered/select-filtered.component";
import { firstValueFrom, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { userFilter } from '../../../../shared/models/user-filter.type';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pais } from '../../../../shared/models/basic-data.type';

@Component({
  selector: 'app-input-filter',
  imports: [SelectFilteredComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
  providers: []
})
export class InputFilterComponent implements OnInit {
  protected basicDataService = inject(BasicDataService);
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
    if(sessionStorage.getItem('filter')){
      while (!this.basicDataService.isLoaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
              
      const filter: userFilter = JSON.parse(sessionStorage.getItem('filter')!);

      this.filterForm.patchValue({
        continente: filter.FK_CONTINENTE ? this.basicDataService.getContinenteById(filter.FK_CONTINENTE!)?.nome : '',
        via: filter.FK_VIA ? this.basicDataService.getViaById(filter.FK_VIA)!.tipo : "",
        ano: filter.DATA_CHEGADA ? filter.DATA_CHEGADA.substring(0,4) : "",
        pais: filter.FK_PAIS ? this.basicDataService.getPaisById(filter.FK_PAIS)!.nome : '',
        federacao: filter.FK_FEDERACAO_BRASIL ? this.basicDataService.getFederacaoBrasilById(filter.FK_FEDERACAO_BRASIL!)!.nome : '',
        mes: filter.DATA_CHEGADA ? this.mesesList.find(x => x.id == Number(filter.DATA_CHEGADA!.substring(5,7)))?.mes : ""
      });
    }
  }

  private handleFilterChanges(formValues: any) {
    if(formValues && Object.values(formValues).some(value => value !== '')) {
      const filter: userFilter = JSON.parse(sessionStorage.getItem('filter')!);
      const newFilter: userFilter = {
      ID_FILTRO: filter.ID_FILTRO ? JSON.parse(sessionStorage.getItem('filter')!).ID_FILTRO : 0,
      FK_EMPRESA: Number(sessionStorage.getItem('EMPRESA_USUARIO')!),
      NOME: filter.NOME ? JSON.parse(sessionStorage.getItem('filter')!).NOME : 'Filtro Padrão',
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

    sessionStorage.setItem('filter', JSON.stringify(newFilter));

    this.filterChange.emit()
    }
  }

  resetFilters() {
    this.filterForm.reset();
  }
}
