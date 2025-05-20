import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-kpi',
  imports: [],
  templateUrl: './card-kpi.component.html',
  styleUrl: './card-kpi.component.css'
})
export class CardKpiComponent {
  @Input() conteudoKpi:string = '';
  @Input() titulo:string = '';
}
