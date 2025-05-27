import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BarChartAll } from '../../../shared/models/bar-chart-all.type';
import { BarChartUF } from '../../../shared/models/bar-chart-uf.type';
import { BarChartPais } from '../../../shared/models/bar-chart-pais.type';
import { KpiTotal } from '../../../shared/models/kpi-total.type';
import { KpiVariacaoAno } from '../../../shared/models/kpi-variacao-ano.type';
import { KpiVariacaoMes } from '../../../shared/models/kpi-variacao-mes.type';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { userFilter } from '../../../shared/models/user-filter.type';

@Injectable()
export class DataService {
  private http = inject(HttpClient);

  private currentFilter = new BehaviorSubject<userFilter | null>(null);

  public filterChanges$ = this.currentFilter.asObservable();

  private baseUrl = '/appDashboard';

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao carregar os dados: ' + error.message || 'Erro desconhecido'));
  }

  private formatFilter(filter: userFilter): Record<string, any> {
    return {
      DATA_CHEGADA: filter.DATA_CHEGADA || null,
      FK_CONTINENTE: filter.FK_CONTINENTE || null,
      FK_PAIS: filter.FK_PAIS || null,
      FK_VIA: filter.FK_VIA || null,
      FK_FEDERACAO_BRASIL: filter.FK_FEDERACAO_BRASIL || null,
    };
  }

  public updateFilter(filter: userFilter) {
    this.currentFilter.next(filter);
  }
  
  private makeRequest<T>(endpoint: string, filter?: userFilter | null): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}`;

    if (filter) {
      const formattedFilter = this.formatFilter(filter as userFilter);
      return this.http.get<T[]>(url, { params: formattedFilter })
        .pipe(catchError(this.handleError));
    }

    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getBarChartAll(): Observable<BarChartAll[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<BarChartAll>('graficoTendenciasPrincipal', filter))
    );
  }

  public getBarChartUF(): Observable<BarChartUF[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<BarChartUF>('graficoTendenciasUF', filter))
    );
  }

  public getBarChartPais(): Observable<BarChartPais[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<BarChartPais>('graficoTendenciasPais', filter))
    );
  }

  public getKpiTotal(): Observable<KpiTotal[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<KpiTotal>('kpiTotal', filter))
    );
  }

  public getKpiVariacaoAno(): Observable<KpiVariacaoAno[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<KpiVariacaoAno>('kpiVariacaoAno', filter))
    );
  }

  public getKpiVariacaoMes(): Observable<KpiVariacaoMes[]> {
    return this.filterChanges$.pipe(
      switchMap(filter => this.makeRequest<KpiVariacaoMes>('kpiVariacaoMes', filter))
    );
  }
}

