import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-configuracoes-perfil',
  imports: [],
  templateUrl: './configuracoes-perfil.component.html',
  styleUrl: './configuracoes-perfil.component.css'
})
export class ConfiguracoesPerfilComponent implements OnInit {
  constructor(public headerTitleService: HeaderTitleService) { }
    
  ngOnInit(): void {
    this.headerTitleService.setTitle('Configurações');
  }
}
