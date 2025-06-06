import { Component, inject, signal } from '@angular/core';
import { userFilter } from '../../../../shared/models/user-filter.type';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserFiltersService } from '../../../../core/services/user-filters/user-filters.service';
import { DatePipe } from '@angular/common';
import { BasicDataService } from '../../../../core/services/basicData/basicData.service';
import { tap } from 'rxjs';
import { LoaderComponent } from "../../../../shared/components/loader/loader/loader.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card-filter',
  imports: [DragDropModule, LoaderComponent, RouterLink],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.css',
  providers: [UserFiltersService, DatePipe],
})
export class CardFilterComponent {
  private cardFilterService = inject(UserFiltersService)
  private datePipe = inject(DatePipe);
  private basicDataService = inject(BasicDataService);

  protected filterList = signal<userFilter[]>([]);
  protected isLoading = signal(true);

  constructor() {
    this.cardFilterService.getUserFilters()
      .pipe(
        tap(() => this.isLoading.set(false))
      )
      .subscribe(data => {
        this.filterList.set(data);
      });
  }

  drop(event: CdkDragDrop<userFilter[]>) {
    moveItemInArray(this.filterList(), event.previousIndex, event.currentIndex);
  }

  getFilterTransformedValues(filter : userFilter) {
    let transformedFilter: {
      DATA_CHEGADA?: string | null,
      CONTINENTE?: string,
      PAIS?: string,
      VIA?: string,
      FEDERACAO?: string,
    } = {
      DATA_CHEGADA: filter.DATA_CHEGADA ? this.transformDate(filter.DATA_CHEGADA) : undefined,
      CONTINENTE: filter.FK_CONTINENTE ? this.basicDataService.getContinenteById(filter.FK_CONTINENTE)?.nome : undefined,
      PAIS: filter.FK_PAIS ? this.basicDataService.getPaisById(filter.FK_PAIS)?.nome : undefined,
      VIA: filter.FK_VIA ? this.basicDataService.getViaById(filter.FK_VIA)?.tipo : undefined,
      FEDERACAO: filter.FK_FEDERACAO ? this.basicDataService.getFederacaoBrasilById(filter.FK_FEDERACAO)?.nome : undefined,
    };
    return Object.values(transformedFilter).filter((value) => value !== undefined && value !== null);
  }

  private transformDate(date: string | Date): string {
    const dateValue = new Date(date);
    let fullDateFormat = ''
    
    if (fullDateFormat.includes('00/00')) {
      fullDateFormat = this.datePipe.transform(dateValue, 'yyyy') || '';
    } else {
      fullDateFormat =  this.datePipe.transform(dateValue, 'MM/yyyy') || '';
    }
    return fullDateFormat;
  }

  protected useFilter(filterID: number){
    if(sessionStorage.getItem('filter') !== null || sessionStorage.getItem('filter') !== undefined){
      sessionStorage.setItem('filter', JSON.stringify(this.filterList().find(f => f.ID_FILTRO == filterID)))
    }
  }
}


