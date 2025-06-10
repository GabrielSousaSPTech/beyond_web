import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from "@angular/core";
import { HeaderTitleService } from "../../core/services/header-title/header-title.service";
import { ContentSectionComponent } from "../../shared/components/content-section/content-section.component";
import { CardAtividadesComponent } from "./components/card-atividades/card-atividades.component";
import { CardUserComponent } from "./components/card-user/card-user.component";
import { organizacaoService } from "./services/organizacao/Organizacao.service";
import { Clipboard, ClipboardModule } from "@angular/cdk/clipboard";
import { FormsModule } from "@angular/forms";
import { Observable, single } from "rxjs";
import { userRegisteredApi } from "../../shared/models/users-registered";
import { UserModelComponent } from "./components/user-model/user-model.component";
import { CardUserService } from "./services/card-user/card-user.service";
import { SolicitacoesPopupComponent } from "./components/solicitacoes-popup/solicitacoes-popup.component";
import { UserService } from "../../core/services/user/user.service";

import { CommonModule } from "@angular/common";
import { CampoCanalSlackComponent } from "./components/campo-canal-slack/campo-canal-slack.component";
import { SlackNotificacaoService } from "./services/slack-notificacao/slack-notificacao.service";
import { statusSlack } from "../../shared/models/statusSlack.type";
import { HttpClient } from "@angular/common/http";
import { CampoCanalSlackService } from "./services/campo-canal-slack/campo-canal-slack.service";

@Component({
  selector: "app-organizacao",
  imports: [
    ContentSectionComponent,
    CardUserComponent,
    CardAtividadesComponent,
    ClipboardModule,
    FormsModule,
    UserModelComponent,
    SolicitacoesPopupComponent,
    CommonModule,
    CampoCanalSlackComponent,
  ],
  templateUrl: "./organizacao.component.html",
  styleUrl: "./organizacao.component.css",
  providers: [
    organizacaoService,
    Clipboard,
    CardUserService,
    SlackNotificacaoService,
    HttpClient,
    CampoCanalSlackService,
  ],
})
export class OrganizacaoComponent implements OnInit {
  protected userService = inject(UserService);
  protected cardUserService = inject(CardUserService);

  protected editUser: WritableSignal<boolean> = signal(false);
  protected solicicoesPopup: WritableSignal<boolean> = signal(false);
  protected userName: WritableSignal<string> = signal("");

  constructor(public headerTitleService: HeaderTitleService) {
    if (this.userService.nivelPermissao() != "Privilegiado") {
      window.history.back();
    }
  }
  protected slackConfig: WritableSignal<Boolean> = signal(false);
  SlackNotificacaoService = inject(SlackNotificacaoService);
  protected notificacaoCheck: WritableSignal<number> = signal(0);
  OrganizacaoService = inject(organizacaoService);
  dataOut: WritableSignal<any> = signal({});
  qtdMembros: number = 0;
  ngOnInit(): void {
    this.headerTitleService.setTitle("Controle de Acesso");
    this.cardUserService.activeUser$.subscribe((data) => {
      this.userName.set(data.NOME);
    });
    this.OrganizacaoService.getDadosEmpresa();
    this.OrganizacaoService.dadosOrganizacao$.subscribe((data) => {
      this.dataOut.set(data);
    });
    this.OrganizacaoService.countMembros();
    this.OrganizacaoService.countMembro$.subscribe((qtd: any) => {
      this.qtdMembros = qtd.quantidade;
    });
    this.SlackNotificacaoService.getInfoSlack();
    this.SlackNotificacaoService.slack$.subscribe((data) => {
      if (data.NOTIFICACAO_STATUS == 1) {
        this.notificacaoCheck.set(1);
      } else {
        this.notificacaoCheck.set(0);
      }
    });
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

  statusNotificacao(){
    const novoValor = this.notificacaoCheck() == 1 ? 0 : 1;

    this.SlackNotificacaoService.postinfoSlack((novoValor));
    
    this.notificacaoCheck.set(novoValor);
    console.log(novoValor)
  }

  emailParaEnvio: string = "";

  enviar() {
    if (!this.emailParaEnvio) {
      console.warn("Email não preenchido");
      return;
    }
    this.OrganizacaoService.enviarEmail(
      this.emailParaEnvio,
      this.dataOut().CHAVE_ATIVACAO
    ).subscribe({
      next: (res: any) => {
        console.log("Email enviado com sucesso:", res);
        this.emailParaEnvio = "";
      },
      error: (err: any) => {
        console.error("Erro ao enviar email:", err);
        this.emailParaEnvio = "";
      },
    });
  }

  openUserModel(user: userRegisteredApi) {
    this.cardUserService.setActiveUser(user);
    this.editUser.set(true);
  }

  openSolicitacoesPupup() {
    if (this.solicicoesPopup()) {
      this.solicicoesPopup.set(false);
    } else {
      this.solicicoesPopup.set(true);
    }
  }
}
