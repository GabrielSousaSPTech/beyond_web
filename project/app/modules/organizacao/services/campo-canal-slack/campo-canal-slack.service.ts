import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { canalSlack } from '../../../../shared/models/canalSlack.type';

@Injectable()

export class CampoCanalSlackService {

  constructor() {
    this.getCanalSlack();
  }
  
  private http = inject(HttpClient);
  private slackSubject = new BehaviorSubject<canalSlack>({} as canalSlack);
  public slack$ = this.slackSubject.asObservable();

  getCanalSlack(): void {
    this.http.get<canalSlack>(`/slack/canal/${sessionStorage.getItem('EMPRESA_USUARIO')}`)
      .subscribe({
        next: (response) => {
          this.slackSubject.next(response);
          return;
        },
        error: (error) => {
          console.error('Erro ao buscar canal Slack:', error);
        }
      });
  }

  postCanalSlack(editarCanal: string): Observable<any> {
    const idEmpresa = sessionStorage.getItem('EMPRESA_USUARIO');

    if (!idEmpresa) {
      return throwError('Company ID not found in session storage');
    }

    const body = { canal: editarCanal };
    return this.http.put(`/slack/canal/${idEmpresa}`, body);
  }
}
