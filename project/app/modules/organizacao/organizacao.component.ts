import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent} from '../../shared/components/content-section/content-section.component';
import { CardAtividadesComponent } from './components/card-atividades/card-atividades.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { Observable, single } from 'rxjs';
import { userRegisteredApi } from '../../shared/models/users-registered';
import { UserModelComponent } from "./components/user-model/user-model.component";
import { CardUserService } from './services/card-user/card-user.service';

@Component({
  selector: 'app-organizacao',
  imports: [ContentSectionComponent, CardUserComponent, CardAtividadesComponent, UserModelComponent],
  templateUrl: './organizacao.component.html',
  styleUrl: './organizacao.component.css',
  providers:[CardUserService]
})
export class OrganizacaoComponent implements OnInit{
  protected cardUserService = inject(CardUserService);

  protected editUser: WritableSignal<boolean> = signal(false);
  protected userName: WritableSignal<string> = signal('')

  constructor(public headerTitleService: HeaderTitleService) { }
    
      ngOnInit(): void {
        this.headerTitleService.setTitle('Controle de Acesso');

        this.cardUserService.activeUser$.subscribe(data=>{
          this.userName.set(data.NOME);
        })
      }

      openUserModel(user: userRegisteredApi){
        this.cardUserService.setActiveUser(user);
        this.editUser.set(true);
      }
}
