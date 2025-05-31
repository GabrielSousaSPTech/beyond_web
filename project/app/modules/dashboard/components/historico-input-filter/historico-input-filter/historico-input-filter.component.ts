import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SelectFilteredComponent } from "../../select-filtered/select-filtered/select-filtered.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BasicDataService } from '../../../../../core/services/basicData/basicData.service';
import { map } from 'rxjs';
import { lineFilterChart } from '../../../../../shared/models/line-filter-chart.type';
import { DataHistoricoService } from '../../../services/dataHistorico.service';

@Component({
  selector: 'app-historico-input-filter',
  imports: [SelectFilteredComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './historico-input-filter.component.html',
  styleUrl: './historico-input-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricoInputFilterComponent {
  private dataHistorico = inject(DataHistoricoService)
  protected basicDataService = inject(BasicDataService)
  protected filterForm: FormGroup;

  constructor (private fb: FormBuilder){
    this.filterForm = this.fb.group({
      vias: [''],
      anos: [''],
      paises: [''],
      federacoes: [''],
    });

     this.filterForm.valueChanges.subscribe(formValues => {
      this.handleFilterChanges(formValues);
    });
  }

  private handleFilterChanges(formValues: any) {
    if(Object.values(formValues).find(x => x != '') != undefined){
      const filter = {
        ANOS: formValues.anos ? formValues.anos : null,
        FK_VIA: formValues.vias ? this.basicDataService.getViaByName(formValues.vias)?.id : null,
        FK_PAIS: formValues.paises ? this.basicDataService.getPaisByName(formValues.paises)?.id : null,
        FK_FEDERACAO_BRASIL: formValues.federacoes ? this.basicDataService.getFederacaoBrasilByName(formValues.federacoes)?.id : null
      } as lineFilterChart
      this.dataHistorico.setActiveFilter(filter);
    }
  }
 }
