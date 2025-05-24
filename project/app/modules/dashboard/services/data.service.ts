import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';
import { BarChartUF } from '../../../shared/models/bar-chart-uf.type';
import { BarChartPais } from '../../../shared/models/bar-chart-pais.type';
import { KpiTotal } from '../../../shared/models/kpi-total.type';
import { KpiVariacaoAno } from '../../../shared/models/kpi-variacao-ano.type';
import { KpiVariacaoMes } from '../../../shared/models/kpi-variacao-mes.type';
import { catchError, Observable, throwError } from 'rxjs';
import { userFilter } from '../../../shared/models/user-filter.type';

@Injectable()
export class DataService {
  private http = inject(HttpClient);

  private baseUrl = '/appDashboard';

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  private formatFilter(filter: userFilter): Record<string, any> {
    return {
      DATA_CHEGADA: filter.DATA_CHEGADA || null,
      FK_CONTINENTE: filter.FK_CONTINENTE || null,
      FK_PAIS: filter.FK_PAIS || null,
      FK_VIA: filter.FK_VIA || null,
      FK_FEDERACAO: filter.FK_FEDERACAO || null,
    };
}

private makeRequest<T>(endpoint: string, filter?: userFilter | string): Observable<T[]> {
  const url = `${this.baseUrl}/${endpoint}`;
  
  if (filter && filter !== '') {
    const formattedFilter = this.formatFilter(filter as userFilter);
    return this.http.get<T[]>(url, { params: formattedFilter })
      .pipe(catchError(this.handleError));
  }
  
  return this.http.get<T[]>(url)
    .pipe(catchError(this.handleError));
}

public getBarChartAll(filter?: userFilter | string): Observable<BarChartAll[]> {
  return this.makeRequest<BarChartAll>('graficoTendenciasPrincipal', filter);
}

public getBarChartUF(filter?: userFilter | string): Observable<BarChartUF[]> {
  return this.makeRequest<BarChartUF>('graficoTendenciasUF', filter);
}

public getBarChartPais(filter?: userFilter | string): Observable<BarChartPais[]> {
  return this.makeRequest<BarChartPais>('graficoTendenciasPais', filter);
}

public getKpiTotal(filter?: userFilter | string): Observable<KpiTotal[]> {
  return this.makeRequest<KpiTotal>('kpiTotal', filter);
}

public getKpiVariacaoAno(filter?: userFilter | string): Observable<KpiVariacaoAno[]> {
  return this.makeRequest<KpiVariacaoAno>('kpiVariacaoAno', filter);
}

public getKpiVariacaoMes(filter?: userFilter | string): Observable<KpiVariacaoMes[]> {
  return this.makeRequest<KpiVariacaoMes>('kpiVariacaoMes', filter);
}
}

