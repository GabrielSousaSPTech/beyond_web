import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, Observable, Subscription, throwError } from 'rxjs';
import { timeoutProvider } from 'rxjs/internal/scheduler/timeoutProvider';
import { Log } from '../../../../shared/models/log.type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardAtividadesService {
  private baseUrl = '/log';
  private http = inject(HttpClient);

  private getLogSubject: BehaviorSubject<Log[]> = new BehaviorSubject([] as Log[])
  public Log$ = this.getLogSubject.asObservable();

  private pollingSubscription: Subscription;

  public getUsersActivity() {
    this.makeRequest<Log>('empresa/' + sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({
      next: (logs) => {
        this.getLogSubject.next(logs as Log[]);
      },
      error: (error) => {
        console.error('Erro ao carregar atividades do usuário:', error);
      }
    }
    )
  }

  private makeRequest<T>(endpoint: string): Observable<T[]> {
    const url = `${this.baseUrl}/${endpoint}`;

    return this.http.get<T[]>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Erro ao carregar os dados: ' + error.message || 'Erro desconhecido'));
  }

  constructor() {
    this.getUsersActivity();
    this.pollingSubscription = interval(10000)
      .subscribe(() => {
        this.getUsersActivity();
      });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
