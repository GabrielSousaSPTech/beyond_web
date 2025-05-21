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

  public getBarChartAll(): Observable<BarChartAll[]> {
    return this.http.get<BarChartAll[]>(`${this.baseUrl}/graficoTendenciasPrincipal`)
    .pipe(catchError(this.handleError));
  }

  public getBarChartUF(): Observable<BarChartUF[]> {
    return this.http.get<BarChartUF[]>(`${this.baseUrl}/graficoTendenciasUF`)
    .pipe(catchError(this.handleError));
  }

  public getBarChartPais() {
    return this.http.get<BarChartPais[]>(`${this.baseUrl}/graficoTendenciasPais`)
    .pipe(catchError(this.handleError));
  }

  public getKpiTotal() {
    return this.http.get<KpiTotal[]>(`${this.baseUrl}/kpiTotal`)
    .pipe(catchError(this.handleError));
  }

  public getKpiVariacaoAno() {
    return this.http.get<KpiVariacaoAno[]>(`${this.baseUrl}/kpiVariacaoAno`)
    .pipe(catchError(this.handleError));
  }

  public getKpiVariacaoMes() {
    return this.http.get<KpiVariacaoMes[]>(`${this.baseUrl}/kpiVariacaoMes`)
    .pipe(catchError(this.handleError));
  }
}

