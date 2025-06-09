import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { lineChartYear } from '../../../shared/models/line-chart-year.type';
import { lineFilterChart } from '../../../shared/models/line-filter-chart.type';
import { kpiHistoricoTotal } from '../../../shared/models/kpi-hist-total.type';
import { kpiHistoricoAno } from '../../../shared/models/kpi-hist-ano.type';
import { kpiHistoricoMes } from '../../../shared/models/kpi-hist-mes.type';

@Injectable()
export class DataHistoricoService {
  private http = inject(HttpClient);

  private activeLineFilterSubject: BehaviorSubject<lineFilterChart>;
  public activeLineFilter$: Observable<lineFilterChart>;

  private baseUrl = '/appDashboard';

  constructor() {
    const filter = {
      ANOS: undefined,
      FK_VIA: undefined,
      FK_PAIS: undefined,
      FK_FEDERACAO_BRASIL: undefined
    } as lineFilterChart
    this.activeLineFilterSubject = new BehaviorSubject<lineFilterChart>(filter);
    this.activeLineFilter$ = this.activeLineFilterSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao carregar os dados: ' + error.message || 'Erro desconhecido'));
  }

  private makeRequest<T>(endpoint: string, filter?: lineFilterChart | null): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}`;

    if (filter && Object.values(filter).find(x => x != undefined) != undefined) {
      return this.http.get<T[]>(url, { params: filter })
        .pipe(catchError(this.handleError));
    }

    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError));
  }

  public getLineChartAll(): Observable<lineChartYear[]> {
    return this.activeLineFilter$.pipe(
      switchMap(filter => {
        return this.makeRequest<lineChartYear>("graficoHistorico", filter).pipe(
          catchError(error => {
            console.error('Error in getLineChartAll:', error);
            return [];
          })
        )
      })
    )
  }

  public getKpiHistoricoTotal(): Observable<kpiHistoricoTotal[]> {
    return this.activeLineFilter$.pipe(
      switchMap(filter => {
        return this.makeRequest<kpiHistoricoTotal>("KPIHistoricoTotal", filter).pipe(
          catchError(error => {
            console.error('Error in getKpiHistoricoTotal:', error);
            return [];
          })
        )
      })
    )
  }

  public getKpiHistoricoAno(): Observable<kpiHistoricoAno[]> {
    return this.activeLineFilter$.pipe(
      switchMap(filter => {
        return this.makeRequest<kpiHistoricoAno>("KPIHistoricoAno", filter).pipe(
          catchError(error => {
            console.error('Error in getKpiHistoricoAno:', error);
            return [];
          })
        )
      })
    )
  }

  public getKpiHistoricoMes(): Observable<kpiHistoricoMes[]> {
    return this.activeLineFilter$.pipe(
      switchMap(filter => {
        return this.makeRequest<kpiHistoricoMes>("KPIHistoricoMes", filter).pipe(
          catchError(error => {
            console.error('Error in getKpiHistoricoMes:', error);
            return [];
          })
        )
      })
    )
  }

  setActiveFilter(filter: lineFilterChart) {
    console.log("dentro do set", filter)
    this.activeLineFilterSubject.next(filter);
  }

}


