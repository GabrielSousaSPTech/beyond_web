import { Component, inject, OnInit, signal, WritableSignal,  } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent} from '../../shared/components/content-section/content-section.component';
import { CardAtividadesComponent } from './components/card-atividades/card-atividades.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { organizacaoService } from './services/organizacao/Organizacao.service';
import {Clipboard, ClipboardModule} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent, ClipboardModule],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css',
  providers: [organizacaoService, Clipboard]
})
export class OrganizacaoComponent implements OnInit{
  constructor(public headerTitleService: HeaderTitleService) { }
    OrganizacaoService = inject(organizacaoService)
    dataOut: WritableSignal<any> = signal({});
    qtdMembros = 0;
      ngOnInit(): void {
        this.headerTitleService.setTitle('Controle de Acesso');
        this.OrganizacaoService.getDadosEmpresa();
        this.OrganizacaoService.dadosOrganizacao$.subscribe(data =>{
          this.dataOut.set(data);
        })

        this.OrganizacaoService.countMembros().subscribe(qtd=>{
          this.qtdMembros = qtd;
        })
      }
}
