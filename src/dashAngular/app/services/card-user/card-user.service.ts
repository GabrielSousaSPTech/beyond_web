import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardUserService {
  getUsersActivity(): import("../../models/user-activity.type").userActivity[] {
    throw new Error('Method not implemented.');
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
