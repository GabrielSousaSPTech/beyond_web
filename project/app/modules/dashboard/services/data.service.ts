import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';
import { BarChartUF } from '../../../shared/models/bar-chart-uf.type';
import { BarChartPais } from '../../../shared/models/bar-chart-pais.type';
import { KpiTotal } from '../../../shared/models/kpi-total.type';
import { KpiVariacaoAno } from '../../../shared/models/kpi-variacao-ano.type';
import { KpiVariacaoMes } from '../../../shared/models/kpi-variacao-mes.type';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class DataService {
  private http = inject(HttpClient);

  private baseUrl = '/appDashboard';

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  public getBarChartAll(filtro?: string): Observable<BarChartAll[]> {
    let url = `${this.baseUrl}/graficoTendenciasPrincipal`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }

    return this.http.get<BarChartAll[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getBarChartUF(filtro?: string): Observable<BarChartUF[]> {
    let url = `${this.baseUrl}/graficoTendenciasUF`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }

    return this.http.get<BarChartUF[]>(url)
      .pipe(catchError(this.handleError));
  }


  public getBarChartPais(filtro?: string) {
    let url = `${this.baseUrl}/graficoTendenciasPais`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }

    console.log("Essa é a url do angular: " + url);

    return this.http.get<BarChartPais[]>(url)
      .pipe(catchError(this.handleError));
  }


  public getKpiTotal(filtro?: string) {
    let url = `${this.baseUrl}/kpiTotal`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }
    return this.http.get<KpiTotal[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getKpiVariacaoAno(filtro?: string) {
    let url = `${this.baseUrl}/kpiVariacaoAno`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }
    return this.http.get<KpiVariacaoAno[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getKpiVariacaoMes(filtro?: string) {
    let url = `${this.baseUrl}/kpiVariacaoMes`;

    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`; // Adiciona o filtro à URL
    }
    return this.http.get<KpiVariacaoMes[]>(url)
      .pipe(catchError(this.handleError));
  }
}

