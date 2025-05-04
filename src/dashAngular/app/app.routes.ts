import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent() {
            return import('./home/home.component').then(
                m => m.HomeComponent
            )
        },
    },
    {
        path: 'tendencias',
        pathMatch: 'full',
        loadComponent() {
            return import("./tendencias/tendencias.component").then(
                m => m.TendenciasComponent
            )
        },
        
    },
    {
        path: 'organizacao',
        pathMatch: 'full',
        loadComponent() {
            return import("./organizacao/organizacao.component").then(
                m => m.OrganizacaoComponent
            )
        },
    },
    {
        path: 'historico',
        pathMatch: 'full',
        loadComponent() {
            return import('./painel-de-controle-historico/painel-de-controle-historico.component').then(
                m => m.PainelDeControleHistoricoComponent
            );
        },
    },
    {
        path: 'configuracoes',
        pathMatch: 'full',
        loadComponent() {
            return import('./configuracoes-perfil/configuracoes-perfil.component').then(
                m => m.ConfiguracoesPerfilComponent
            );
        },
    }
];


  

