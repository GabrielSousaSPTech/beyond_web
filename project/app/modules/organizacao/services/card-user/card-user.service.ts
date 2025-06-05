import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {userRegisteredApi } from '../../../../shared/models/users-registered';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CardUserService {
  private http = inject(HttpClient);

  private activeUserSubject: BehaviorSubject<userRegisteredApi> = new BehaviorSubject({} as userRegisteredApi)
  public activeUser$ = this.activeUserSubject.asObservable();

  public getUsersActivity: WritableSignal<userRegisteredApi[]> = signal([] as userRegisteredApi[]);

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
            TIPO: event.TIPO,
            TEL: event.TEL
          } as userRegisteredApi
        }))
      },
      error: (error) =>{
        return error
      }
    })
  }

  setActiveUser(user: userRegisteredApi){
    this.activeUserSubject.next(user);
  }
}
