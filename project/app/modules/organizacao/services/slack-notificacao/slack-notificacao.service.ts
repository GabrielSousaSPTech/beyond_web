import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { statusSlack } from '../../../../shared/models/statusSlack.type';

@Injectable()

export class SlackNotificacaoService {

  private http = inject(HttpClient);
  private slackSubject = new BehaviorSubject<statusSlack>({}as statusSlack);
  public slack$ = this.slackSubject.asObservable();

  getInfoSlack(){
    this.http.get<statusSlack[]>(`/slack/${sessionStorage.getItem('EMPRESA_USUARIO')}`)
    .subscribe({
    next: (response) => {
      this.slackSubject.next(response[0])
      console.log(response)
      return
    },
    error: (error) => {
      console.error('Erro ao carregar status:', error);
    }
  });
  }

  postinfoSlack(novoStatus: number) {
  const idEmpresa = sessionStorage.getItem('EMPRESA_USUARIO');
  const body = { notificacaoStatus: novoStatus };

  this.http.put(`/slack/${idEmpresa}`, body).subscribe({
    next: () => {
      console.log('Status atualizado com sucesso!');
      this.getInfoSlack();
    },
    error: (error) => {
      console.error('Erro ao atualizar status:', error);
    }
  });
}

  constructor() {
    this.getInfoSlack();
  }
}
