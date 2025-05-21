import { Injectable } from '@angular/core';
import { userFilter } from '../../../../shared/models/user-filter.type';


@Injectable({
  providedIn: 'root'
})
export class CardFilterService {

  getUserFilters(){
    return [{
      id: 0, nome: "Turistas Franceses", pais: "França", ano: 2024, continente: "Europa", viaChegada: "Avião", desembarque: "GRU"
    },
  ] as userFilter[]
  }
}
