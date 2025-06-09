import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent() {
            return import('./modules/home/home.component').then(
                m => m.HomeComponent
            )
        },
    },
    {
        path: 'tendencias',
        pathMatch: 'full',
        loadComponent() {
            return import("./modules/dashboard/tendencias/tendencias.component").then(
                m => m.TendenciasComponent
            )
        },
        
    },
    {
        path: 'organizacao',
        pathMatch: 'full',
        loadComponent() {
            return import("./modules/organizacao/organizacao.component").then(
                m => m.OrganizacaoComponent
            )
        },
    },
    {
        path: 'historico',
        pathMatch: 'full',
        loadComponent() {
            return import('./modules/dashboard/historico/historico.component').then(
                m => m.HistoricoComponent
            );
        },
    },
    {
        path: 'configuracoes',
        pathMatch: 'full',
        loadComponent() {
            return import('./modules/configuracoes-perfil/configuracoes-perfil.component').then(
                m => m.ConfiguracoesPerfilComponent
            );
        },
    },
    {
        path: 'heatmap',
        pathMatch: 'full',
        loadComponent() {
            return import('./modules/dashboard/heatmap-brazil/heatmap.component').then(
                m => m.HeatmapComponent
            );
        },
    }
];


  

