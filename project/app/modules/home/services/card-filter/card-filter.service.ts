import { Injectable } from '@angular/core';
import { userFilter } from '../../../../shared/models/user-filter.type';


@Injectable({
  providedIn: 'root'
})
export class CardFilterService {

  getUserFilters(){
    return [{
      id: 0, nome: "Paises altos", pais: "Brasil", ano: 2077, continente: "America", viaChegada: "Avião", desembarque: "GRU"
    },
    {
      id: 1, nome: "Paises altos", pais: "", ano: 2025, continente: "America", viaChegada: "Avião", desembarque: "GRU"
    }
  ] as userFilter[]
  }
}
