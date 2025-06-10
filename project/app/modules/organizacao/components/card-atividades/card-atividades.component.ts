import { Component, inject, signal } from '@angular/core';
import { CardAtividadesService } from '../../services/card-atividades/card-atividades.service';
import { userActivity } from '../../../../shared/models/user-activity.type';
import { Log } from '../../../../shared/models/log.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-atividades',
  imports: [DatePipe],
  templateUrl: './card-atividades.component.html',
  styleUrl: './card-atividades.component.css'
})
export class CardAtividadesComponent {
  cardUserService = inject(CardAtividadesService)
  userActivityList = signal<Log[]>([]);
  
  ngOnInit():void {
    
    this.cardUserService.Log$.subscribe((data: Log[]) => {
      this.userActivityList.set(data as Log[]);
    });
  }
  
  getAtividadeColorClass(atividade:string){
    var atividadesList:string[] = ["AUTORIZAR", "DELETE", "LOGIN", "UPDATE", "UPDATE_SENHA"];
    var colorClassList:string[] = ["azul", "laranja", "verde", "azul", "azul"]

    return colorClassList[atividadesList.indexOf(atividade)]
  }
}
