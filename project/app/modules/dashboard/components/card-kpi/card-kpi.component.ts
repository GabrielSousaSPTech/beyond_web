import { AsyncPipe } from '@angular/common';
import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from "../../../../shared/components/loader/loader/loader.component";

@Component({
  selector: 'app-card-kpi',
  imports: [AsyncPipe, LoaderComponent],
  templateUrl: './card-kpi.component.html',
  styleUrl: './card-kpi.component.css'
})
export class CardKpiComponent{
  @Input() conteudoKpi!: Observable<String>;
  @Input() titulo: string = '';
}

