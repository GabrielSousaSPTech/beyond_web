import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {userRegisteredApi } from '../../../../shared/models/users-registered';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardUserService {
  private http = inject(HttpClient);



  getUsersActivity: WritableSignal<userRegisteredApi[]> = signal([] as userRegisteredApi[]);


  getUsersRegistered(){
    console.log("Cheguei aqui")
    this.http.get<userRegisteredApi[]>('/usuarios/all/'+sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({
      
      next: (response) => {
        console.log('Usuários recebidos:', response);
        this.getUsersActivity.set(response.map((event) =>{
          return {
            ID_FUNC: event.ID_FUNC,
            NOME: event.NOME,
            FK_PERMISSAO: event.FK_PERMISSAO,
            EMAIL: event.EMAIL,
            TIPO: event.TIPO
          }
        }))
      },
      error: (error) =>{
        return error
      }
    })
  }
}
