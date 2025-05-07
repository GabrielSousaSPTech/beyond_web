import { Injectable } from '@angular/core';
import { userNotification } from '../../models/user-notification.type';

@Injectable({
  providedIn: 'root'
})
export class CardNotificationService {

  getUserNotifications(){
    return [{id: 0, data:"2025-12-27 12:00:00", titulo: "Relatorio mensal criado", descricao: "Chegadas de turistas europeus em São Paulo"}] as userNotification[];
  }
}
