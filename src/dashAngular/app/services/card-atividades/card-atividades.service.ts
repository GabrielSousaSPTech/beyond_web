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
      descricao: "Você alterou o tipo de acesso de Sr. Catty Angstrom para “Adiministrador",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 0,
      tipo: "remover",
      descricao: "Você excluiu Srta. Melanie Cartines da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 0,
      tipo: "adicionar",
      descricao: "Sr. Catty Angstrom entrou utilizando o código da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    },
    {
      id: 0,
      tipo: "adicionar",
      descricao: "Madeline Del Rey entrou utilizando o código da organização",
      dataRegistro: "Data: 01/01/25",
      horaRegistro: "Horário: 00:00:00",
    }]
  }
}
