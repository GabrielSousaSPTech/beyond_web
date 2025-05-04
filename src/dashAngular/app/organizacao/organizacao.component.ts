import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { ContentSectionComponent} from '../shared/content-section/content-section.component';
import { CardUserComponent } from "../components/card-user/card-user.component";
import { CardAtividadesComponent } from "../components/card-atividades/card-atividades.component";

@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css'
})
export class OrganizacaoComponent implements OnInit{
  constructor(public headerTitleService: HeaderTitleService) { }
    
      ngOnInit(): void {
        this.headerTitleService.setTitle('Organização');
      }
}
