import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { BasicDataService } from '../../../../core/services/basicData/basicData.service';
import { SelectFilteredComponent } from "../select-filtered/select-filtered/select-filtered.component";
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { userFilter } from '../../../../shared/models/user-filter.type';

@Component({
  selector: 'app-input-filter',
  imports: [SelectFilteredComponent],
  templateUrl: './input-filter.component.html',
  styleUrl: './input-filter.component.css',
  providers: []
})
export class InputFilterComponent implements OnInit {
  protected basicDataService = inject(BasicDataService);
  protected filterAno: string | undefined = ''
  protected filterMes: string | undefined = ''
  protected filterContinente: string | undefined= ''
  protected filterVia: string | undefined = ''
  protected filterFederacoes: string | undefined = ''
  protected filterPais: string | undefined = ''

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

      console.log("que isso: ")
      console.log(this.basicDataService.getContinenteById(filter.FK_CONTINENTE!))
      
      this.filterAno = filter.DATA_CHEGADA ? filter.DATA_CHEGADA.substring(0,4) : "";
      this.filterMes = filter.DATA_CHEGADA ? 
        this.mesesList.find(x => x.id == Number(filter.DATA_CHEGADA!.substring(5,7)))?.mes ?? "" : "";
      this.filterContinente = filter.FK_CONTINENTE ? this.basicDataService.getContinenteById(filter.FK_CONTINENTE!)?.nome : '';
      this.filterVia = filter.FK_VIA ? this.basicDataService.getViaById(filter.FK_VIA)!.tipo : "";
      this.filterFederacoes = filter.FK_FEDERACAO ? this.basicDataService.getFederacaoBrasilById(filter.FK_FEDERACAO)!.nome : '';
      this.filterPais = filter.FK_PAIS ? this.basicDataService.getPaisById(filter.FK_PAIS)!.nome : '';
      }
  }
  
}
