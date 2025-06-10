import { inject, Injectable } from '@angular/core';
import { dadosOrganizacao, qtdMembros } from '../../../../shared/models/organizacao';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable(
)

export class organizacaoService {
    private http = inject(HttpClient);

    private dadosOrganizacaoSubject = new BehaviorSubject<dadosOrganizacao>({} as dadosOrganizacao);
    public dadosOrganizacao$ = this.dadosOrganizacaoSubject.asObservable();

    private countMembroSubject = new BehaviorSubject<qtdMembros>({} as qtdMembros);
    public countMembro$ = this.countMembroSubject.asObservable();

    getDadosEmpresa() {
        this.http.get<dadosOrganizacao[]>('/empresas/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({

            next: (response) => {
                this.dadosOrganizacaoSubject.next(response[0])
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    countMembros() {
        this.http.get<qtdMembros[]>('/empresas/membros/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({

            next: (response) => {
                this.countMembroSubject.next(response[0])
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    enviarEmail(para: string, codigo: string) {
        const payload = { emailDestinatario: para, codigo: codigo };
        return this.http.post('/email/', payload);
    }
    

}