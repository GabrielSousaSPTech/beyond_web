import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userFilter } from '../../../shared/models/user-filter.type';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class UserFiltersService {
  private http = inject(HttpClient);
  private baseUrl = '/filtro';

  private filtersSubject = new BehaviorSubject<userFilter[]>([]);
  public filters$ = this.filtersSubject.asObservable();

  private activeFilterSubject:BehaviorSubject<userFilter>;
  public activeFilter$:Observable<userFilter>;

  private static clearFilter:userFilter = {
        ID_FILTRO: 0,
        FK_EMPRESA: Number(sessionStorage.getItem('EMPRESA_USUARIO')),
        NOME: '',
        DATA_CHEGADA: '',
        FK_CONTINENTE: undefined,
        FK_FEDERACAO_BRASIL: undefined,
        FK_PAIS: undefined,
        FK_VIA: undefined,
  } as userFilter

   constructor() {
    let filter: string | userFilter | null = sessionStorage.getItem('filter')
    if(!filter){
      filter = UserFiltersService.clearFilter;
      sessionStorage.setItem('filter', JSON.stringify(filter))!
    } else {
      filter = JSON.parse(sessionStorage.getItem('filter')!) as userFilter;
    }
    this.activeFilterSubject = new BehaviorSubject<userFilter>(filter as userFilter)
    this.activeFilter$ = this.activeFilterSubject.asObservable();
    this.loadFilters();
  }

  clearActiveFilter(){
    sessionStorage.setItem('filter', JSON.stringify(UserFiltersService.clearFilter))
    this.activeFilterSubject.next(UserFiltersService.clearFilter);
  }

  setActiveFilter(filter: userFilter){
    sessionStorage.setItem('filter', JSON.stringify(filter))
    this.activeFilterSubject.next(filter);
  }


  private loadFilters() {
    this.http.get<userFilter[]>(`${this.baseUrl}/all/${sessionStorage.getItem('EMPRESA_USUARIO')}`)
      .pipe(catchError(this.handleError))
      .subscribe(filters => this.filtersSubject.next(filters));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('User Filter error:', error);
    return throwError(() => new Error('Um erro aconteceu. Tente novamente'));
  }

  public getUserFilters() {
    return this.filters$;
  }

  public addUserFilter(userFilter: userFilter) {
    console.log('Adding user filter:', userFilter);
    return this.http.post<userFilter>(`${this.baseUrl}/create`, userFilter)
      .pipe(
        catchError(this.handleError),
        tap(() => this.loadFilters())
      );
  }

  public updateUserFilter(userFilter: userFilter) {
    return this.http.put<userFilter>(`${this.baseUrl}/edit/`+userFilter.ID_FILTRO, userFilter)
      .pipe(
        catchError(this.handleError),
        tap(() => this.loadFilters())
      );
  }

  public deleteUserFilter(id: number) {
    return this.http.delete<userFilter>(`${this.baseUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError),
        tap(() => this.loadFilters())
      );
  }
}
