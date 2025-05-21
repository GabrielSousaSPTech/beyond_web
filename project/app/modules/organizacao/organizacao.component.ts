import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent} from '../../shared/components/content-section/content-section.component';
import { CardAtividadesComponent } from './components/card-atividades/card-atividades.component';
import { CardUserComponent } from './components/card-user/card-user.component';

@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css'
})
export class OrganizacaoComponent implements OnInit{
  constructor(public headerTitleService: HeaderTitleService) { }
    
      ngOnInit(): void {
        this.headerTitleService.setTitle('Controle de Acesso');
      }
}
