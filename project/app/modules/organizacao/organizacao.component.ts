import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent} from '../../shared/components/content-section/content-section.component';
import { CardAtividadesComponent } from './components/card-atividades/card-atividades.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { CommonModule } from '@angular/common';
import { CampoCanalSlackComponent } from './components/campo-canal-slack/campo-canal-slack.component';
import { SlackNotificacaoService } from './services/slack-notificacao/slack-notificacao.service';
import { statusSlack } from '../../shared/models/statusSlack.type';
import { HttpClient } from '@angular/common/http';
import { CampoCanalSlackService } from './services/campo-canal-slack/campo-canal-slack.service';

@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent, CommonModule, CampoCanalSlackComponent],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css',
  providers: [SlackNotificacaoService, HttpClient, CampoCanalSlackService]
})
export class OrganizacaoComponent implements OnInit{
  constructor(public headerTitleService: HeaderTitleService) { }
    protected slackConfig: WritableSignal<Boolean> = signal(false);
    SlackNotificacaoService = inject(SlackNotificacaoService);
  protected notificacaoCheck: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.headerTitleService.setTitle('Controle de Acesso');
    this.SlackNotificacaoService.getInfoSlack();
    this.SlackNotificacaoService.slack$.subscribe(data => {
       if(data.NOTIFICACAO_STATUS == 1){
          this.notificacaoCheck.set(1)
        }
        else{
          this.notificacaoCheck.set(0)
        }
    });
  }

  statusNotificacao(){
    const novoValor = this.notificacaoCheck() == 1 ? 0 : 1;

    this.SlackNotificacaoService.postinfoSlack((novoValor));
    
    this.notificacaoCheck.set(novoValor);
    console.log(novoValor)
  }

  @ViewChild(CampoCanalSlackComponent)
  private campoCanalSlackComp!: CampoCanalSlackComponent;

  salvarAlteracoes() {
    this.campoCanalSlackComp.salvarCanalSlack();
    this.btnSlack()
    console.log(`Alterações salvas no banco`)
  }

  btnSlack() {
    if (this.slackConfig()) {
      this.slackConfig.set(false)
    }
    else {
      this.slackConfig.set(true)
    }
  }
}