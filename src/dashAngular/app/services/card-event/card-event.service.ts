import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardEventService {

  getUserEvents(){
    return [{
      id: 0,
      name: "titulo",
      descricao: "opa",
      cor: "#AAA",
      dataInicio: "01/01/0001",
      dataTermino: "22/02/2026",
    },
    {
      id: 1,
      name: "titulo",
      descricao: "opa",
      cor: "#312",
      dataInicio: "01/01/0001",
      dataTermino: "02/01/0001",
    },
    {
      id: 2,
      name: "titulo",
      descricao: "opa",
      cor: "#AAA",
      dataInicio: "01/01/0001",
      dataTermino: "02/01/0001",
    },
    {
      id: 3,
      name: "titulo",
      descricao: "opa",
      cor: "#312",
      dataInicio: "01/01/0001",
      dataTermino: "02/01/0001",
    },
    {
      id: 4,
      name: "titulo",
      descricao: "opa",
      cor: "#AAA",
      dataInicio: "01/01/0001",
      dataTermino: "02/01/0001",
    },
    {
      id: 5,
      name: "Spilae",
      descricao: "oi",
      cor: "#AAA",
      dataInicio: "01/01/0001",
      dataTermino: "02/01/0001",
    }]
  }
}
