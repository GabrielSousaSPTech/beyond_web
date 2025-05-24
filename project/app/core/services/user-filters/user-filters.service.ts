import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userFilter } from '../../../shared/models/user-filter.type';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserFiltersService {
  private http = inject(HttpClient);

  private baseUrl = '/filtro';

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  public getUserFilters() {
    return this.http.get<userFilter[]>(`${this.baseUrl}/all/${sessionStorage.getItem('EMPRESA_USUARIO')}`)
    .pipe(catchError(this.handleError));
  }

  public addUserFilter(userFilter: userFilter) {
    return this.http.post<userFilter>(`${this.baseUrl}//create`, userFilter)
    .pipe(catchError(this.handleError));
  }

  public updateUserFilter(userFilter: userFilter) {
    return this.http.put<userFilter>(`${this.baseUrl}/edit`, userFilter)
    .pipe(catchError(this.handleError));
  }

  public deleteUserFilter(id: number) {
    return this.http.delete<userFilter>(`${this.baseUrl}/delete/${id}`)
    .pipe(catchError(this.handleError));
  }
}
