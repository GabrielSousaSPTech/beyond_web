import { Injectable } from '@angular/core';
import { userActivity } from '../../../../shared/models/user-activity.type';


@Injectable({
  providedIn: 'root'
})
export class CardUserService {

  getUsersActivity() {
    
  }

  getUsersRegistered(){
    return [{
      id: 0,
      name: "Cláudio Frizzarini",
      tipoAcesso: "Administrador",
      foto: "/srcassets/organizacao/icon-user.svg",
      anoInicio: "Desde 2025",
    },
    {
      id: 0,
      name: "Fernanda Caramico",
      tipoAcesso: "Colaborador",
      foto: "/srcassets/organizacao/icon-user.svg",
      anoInicio: "Desde 2025",
    },
    {
      id: 0,
      name: "Gislayno Monteiro",
      tipoAcesso: "Colaborador",
      foto: "/srcassets/organizacao/icon-user.svg",
      anoInicio: "Desde 2025",
    }]
  }
}
