import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {userRegisteredApi } from '../../../../shared/models/users-registered';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { permissao } from '../../../../shared/models/permissao.type';

@Injectable()
export class CardUserService {
  private http = inject(HttpClient);
  private baseUrl = "/usuarios/"

  private activeUserSubject: BehaviorSubject<userRegisteredApi> = new BehaviorSubject({} as userRegisteredApi)
  public activeUser$ = this.activeUserSubject.asObservable();

  public getUsersActivity: WritableSignal<userRegisteredApi[]> = signal([] as userRegisteredApi[]);

  private getUsersRegistedSubject: BehaviorSubject<userRegisteredApi[]> = new BehaviorSubject([] as userRegisteredApi[])
  public getUsersRegisted$ = this.getUsersRegistedSubject.asObservable();

  getUsersRegistered(){
     this.makeRequest('all/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe(
      users =>
      this.getUsersRegistedSubject.next(users as userRegisteredApi[])
    )
  }

  setActiveUser(user: userRegisteredApi){
    this.activeUserSubject.next(user);
  }

  updateUser(user: any){
    this.http.put(`/usuarios/edit/${user.ID_FUNC}`, user).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
  
  updateUserPermitions(userID: number, permissionFK: number){
      this.http.put(`/usuarios/autorizar/${userID}`, {idPermissao: permissionFK}).subscribe({
      next: (response) => {
        console.log(response);
        this.getUsersRegistered()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  deleteUser(userID: number){
    this.http.delete(`/usuarios/delete/${userID}`).subscribe({
      next: (response) => {
        console.log(response);
        this.getUsersRegistered()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  getPermissions(){
    return this.makeRequest<permissao>('permissoes')
  }

  private makeRequest<T>(endpoint: string): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}`;

    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao carregar os dados: ' + error.message || 'Erro desconhecido'));
  }
}
