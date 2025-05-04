import { Component, inject, signal } from '@angular/core';
import { CardAtividadesService } from '../../services/card-atividades/card-atividades.service';
import { userActivity } from '../../models/user-activity.type';

@Component({
  selector: 'app-card-atividades',
  imports: [],
  templateUrl: './card-atividades.component.html',
  styleUrl: './card-atividades.component.css'
})
export class CardAtividadesComponent {
  cardUserService = inject(CardAtividadesService)
  userActivityList = signal<Array<userActivity>>([]);
  
  ngOnInit():void {
    this.userActivityList.set(this.cardUserService.getUsersActivity())
  }
  
  getAtividadeColorClass(atividade:string){
    var atividadesList:string[] = ["acesso", "remover", "adicionar"];
    var colorClassList:string[] = ["azul", "laranja", "verde"]

    return colorClassList[atividadesList.indexOf(atividade)]
  }
}
