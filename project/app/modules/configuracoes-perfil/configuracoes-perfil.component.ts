import { Component, inject, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-configuracoes-perfil',
  imports: [],
  templateUrl: './configuracoes-perfil.component.html',
  styleUrl: './configuracoes-perfil.component.css'
})
export class ConfiguracoesPerfilComponent implements OnInit {
  private userService = inject(UserService);
  userName = this.userService.userName();
  email = this.userService.email();
  nivelPermissao = this.userService.nivelPermissao();
  
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Configurações');
  }
}
