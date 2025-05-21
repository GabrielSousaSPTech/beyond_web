import { Injectable } from '@angular/core';
import { timeoutProvider } from 'rxjs/internal/scheduler/timeoutProvider';

@Injectable({
  providedIn: 'root'
})
export class CardAtividadesService {
  getUsersActivity(){
    return [{
      id: 0,
      tipo: "acesso",
      descricao: "Você alterou o tipo de acesso de user para “Adiministrador",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 1,
      tipo: "remover",
      descricao: "Você excluiu user da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 2,
      tipo: "adicionar",
      descricao: "user entrou utilizando o código da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 3,
      tipo: "adicionar",
      descricao: "user entrou utilizando o código da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    }]
  }
}
