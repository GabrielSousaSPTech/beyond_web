import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { userRegisteredApi } from '../../../../shared/models/users-registered';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { permissao } from '../../../../shared/models/permissao.type';
import { userSolicitacao } from '../../../../shared/models/user-solicitacao.type';
import { organizacaoService } from '../organizacao/Organizacao.service';

@Injectable()
export class CardUserService {
  private http = inject(HttpClient);
  private OrganizacaoService = inject(organizacaoService); // Assuming this is the service for organization-related operations
  private baseUrl = "/usuarios/"

  private activeUserSubject: BehaviorSubject<userRegisteredApi> = new BehaviorSubject({} as userRegisteredApi)
  public activeUser$ = this.activeUserSubject.asObservable();

  public getUsersActivity: WritableSignal<userRegisteredApi[]> = signal([] as userRegisteredApi[]);

  private getUsersRegistedSubject: BehaviorSubject<userRegisteredApi[]> = new BehaviorSubject([] as userRegisteredApi[])
  public getUsersRegisted$ = this.getUsersRegistedSubject.asObservable();

  private getUsersSolicitacaoSubject: BehaviorSubject<userSolicitacao[]> = new BehaviorSubject([] as userSolicitacao[])
  public getUsersSolicitacao$ = this.getUsersSolicitacaoSubject.asObservable();

  getUsersRegistered() {
      this.makeRequest('all/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe(
        users => {
          this.getUsersRegistedSubject.next(users as userRegisteredApi[]);
        }
      );
  }

  getUsersSolicitacao() {
    this.makeRequest('analise/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe(
      users => {
        this.getUsersSolicitacaoSubject.next(users as userSolicitacao[]);
      }
    );
  }

  setActiveUser(user: userRegisteredApi) {
    this.activeUserSubject.next(user);
  }

  updateUser(user: any) {
    this.http.put(`/usuarios/edit/${user.ID_FUNC}`, user).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

private updateSolicitacoes(userID: number): void {
  const currentSolicitations = this.getUsersSolicitacaoSubject.value;
  console.log('Current solicitations:', currentSolicitations);
  const updatedSolicitations = currentSolicitations.filter(user => user.ID_FUNC !== userID);
  this.getUsersSolicitacaoSubject.next(updatedSolicitations);
}

updateUserPermitions(userID: number, permissionFK: number): Observable<any> {
  return this.http.put(`/usuarios/autorizar/${userID}`, { idPermissao: permissionFK }).pipe(
    map(response => {
      this.updateSolicitacoes(userID);
      this.getUsersRegistered();
      this.OrganizacaoService.countMembros();
      return response;
    })
  );
}

deleteUser(userID: number): Observable<any> {
  return this.http.delete(`/usuarios/delete/${userID}`).pipe(
    map(response => {
      const currentSolicitations = this.getUsersSolicitacaoSubject.value;
      const updatedSolicitations = currentSolicitations.filter(user => user.ID_FUNC !== userID);
      this.getUsersSolicitacaoSubject.next(updatedSolicitations);
      this.OrganizacaoService.countMembros();
      return response;
    }),
    catchError(error => {
      console.error('Error deleting user:', error);
      return throwError(() => error);
    })
  );
}

  getPermissions() {
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
