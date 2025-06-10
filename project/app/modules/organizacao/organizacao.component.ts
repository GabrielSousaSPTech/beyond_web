import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent} from '../../shared/components/content-section/content-section.component';
import { CardAtividadesComponent } from './components/card-atividades/card-atividades.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { organizacaoService } from './services/organizacao/Organizacao.service';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { Observable, single } from 'rxjs';
import { userRegisteredApi } from '../../shared/models/users-registered';
import { UserModelComponent } from "./components/user-model/user-model.component";
import { CardUserService } from './services/card-user/card-user.service';

@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent, ClipboardModule, FormsModule, UserModelComponent],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css',
  providers: [organizacaoService, Clipboard, CardUserService]
})
export class OrganizacaoComponent implements OnInit{
  protected cardUserService = inject(CardUserService);

  protected editUser: WritableSignal<boolean> = signal(false);
  protected userName: WritableSignal<string> = signal('')

  constructor(public headerTitleService: HeaderTitleService) { }
    OrganizacaoService = inject(organizacaoService)
    dataOut: WritableSignal<any> = signal({});
    
    qtdMembros = 0;
      ngOnInit(): void {
        this.headerTitleService.setTitle('Controle de Acesso');
        this.cardUserService.activeUser$.subscribe(data=>{
          this.userName.set(data.NOME);
        })
        this.OrganizacaoService.getDadosEmpresa();
        this.OrganizacaoService.dadosOrganizacao$.subscribe(data =>{
          this.dataOut.set(data);
        })
        this.OrganizacaoService.countMembros().subscribe(qtd=>{
          this.qtdMembros = qtd;
        })
      }
      emailParaEnvio: string = '';

      enviar() {
        if (!this.emailParaEnvio) {
          console.warn('Email não preenchido');
        return;
        }
        this.OrganizacaoService.enviarEmail(this.emailParaEnvio, this.dataOut().CHAVE_ATIVACAO).subscribe({
          next: (res: any) => {
            console.log('Email enviado com sucesso:', res);
            this.emailParaEnvio = '';
          },
          error: (err: any) => {
            console.error('Erro ao enviar email:', err);
            this.emailParaEnvio = '';
          }
        });
      }

      openUserModel(user: userRegisteredApi){
        this.cardUserService.setActiveUser(user);
        this.editUser.set(true);
      }
}
