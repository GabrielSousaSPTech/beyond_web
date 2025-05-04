import { Component } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-tendencias',
  imports: [],
  templateUrl: './tendencias.component.html',
  styleUrl: './tendencias.component.css'
})
export class TendenciasComponent {
  constructor(public headerTitleService: HeaderTitleService) { }
  
    ngOnInit(): void {
      this.headerTitleService.setTitle('Painel de controle');
    }
}
