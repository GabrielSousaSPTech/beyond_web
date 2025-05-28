import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { UserFiltersService } from '../../../../core/services/user-filters/user-filters.service';
import { userFilter } from '../../../../shared/models/user-filter.type';
import { tap } from 'rxjs';
import { BasicDataService } from '../../../../core/services/basicData/basicData.service';
import { DataService } from '../../services/data.service';
import { ClickOutsideDirective } from '../../../../core/directives/clickOutside/clickOutside.directive';

@Component({
  selector: 'app-filter-popup',
  imports: [AsyncPipe, ClickOutsideDirective],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.css',
  providers: [DatePipe]
})
export class FilterPopupComponent {
  filterService = inject(UserFiltersService);
  basicDataService = inject(BasicDataService);
  dataService = inject(DataService);
  private datePipe = inject(DatePipe);

  @Input() visible!: WritableSignal<boolean>;

  protected filterList$ = this.filterService.getUserFilters();

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
      FEDERACAO: filter.FK_FEDERACAO_BRASIL ? this.basicDataService.getFederacaoBrasilById(filter.FK_FEDERACAO_BRASIL)?.nome : undefined,
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

  useThisFilter(filter: userFilter){
    this.visible.set(false);
    this.filterService.setActiveFilter(filter)
  }

  closePopup(){
    this.visible.set(false);
  }
}
