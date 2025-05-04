import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardKpiComponent } from '../components/card-kpi/card-kpi.component';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-painel-de-controle-historico',
  imports: [CommonModule, CardKpiComponent],
  templateUrl: './painel-de-controle-historico.component.html',
  styleUrl: './painel-de-controle-historico.component.css'
})
export class PainelDeControleHistoricoComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }
    
  ngOnInit(): void {
    this.headerTitleService.setTitle('Painel de controle');
  }

}


