import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {dadosOrganizacao } from '../../../../shared/models/organizacao';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable(
)

export class organizacaoService {
    private http = inject(HttpClient);

    private dadosOrganizacaoSubject = new BehaviorSubject<dadosOrganizacao>({} as dadosOrganizacao);
    public dadosOrganizacao$ = this.dadosOrganizacaoSubject.asObservable();

    getDadosEmpresa() {
        this.http.get<dadosOrganizacao[]>('/empresas/'+sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({
                
            next:(response)=>{
                this.dadosOrganizacaoSubject.next(response[0])
            },
            error: (error)=>{
                console.error(error)
            }
        })
    }
}