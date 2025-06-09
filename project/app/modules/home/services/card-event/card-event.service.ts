import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { userEvent } from '../../../../shared/models/user-event.type';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardEventService {
  private http = inject(HttpClient);

  getUserEvents: WritableSignal<userEvent[]> = signal([] as userEvent[]);

  constructor() {
    this.getUserEventsApi();
  }

  isModalOpen = signal(false);
  isEditing = signal(false);

  private eventUpdateTrigger = new Subject<userEvent>();
  eventUpdates$ = this.eventUpdateTrigger.asObservable();

  editEvent(eventEdited: userEvent): void {
    this.isModalOpen.set(true);
    this.isEditing.set(true);
    this.eventUpdateTrigger.next(eventEdited)
  }

  addEvent(): void {
    this.isModalOpen.set(true);
    this.isEditing.set(false);
  }

  updateEvent(event: userEvent): void {
    const payload = {
        nome: event.NOME,
        data_inicio: event.DATA_INICIO,
        data_termino: event.DATA_TERMINO,
        descricao: event.DESCRICAO,
        cor: event.COR
    };

    this.http.put<userEvent>(`/eventos/edit/${event.ID_EVENTOS}`, payload).subscribe({
        next: (response) => {
            this.isModalOpen.set(false);
            this.isEditing.set(false);
            this.getUserEventsApi();
        },
        error: (error) => {
            console.error('updateEvent Error:', error);
        }
    });
  }


  insertEvent(event: userEvent): void {
    this.isModalOpen.set(true);
    this.isEditing.set(false);
    const payload = {
        fkEmpresa: sessionStorage.getItem("EMPRESA_USUARIO"),
        nome: event.NOME,
        data_inicio: event.DATA_INICIO,
        data_termino: event.DATA_TERMINO,
        descricao: event.DESCRICAO,
        cor: event.COR
    };
    this.http.post<userEvent>(`/eventos/create`, payload).subscribe({
        next: (response) => {
            this.isModalOpen.set(false);
            this.isEditing.set(false);
            this.getUserEventsApi();
        },
        error: (error) => {
            console.error('addEvent Error:', error);
        }
    });
    this.getUserEventsApi();
  }

  deleteEvent(id: number): void {
    this.http.delete<userEvent>(`/eventos/delete/${id}`).subscribe({
        next: (response) => {
            this.getUserEventsApi();
        },
        error: (error) => {
            console.error('deleteEvent Error:', error);
        }
    });
    this.getUserEventsApi();
  }

  private getUserEventsApi(): void {
    this.http.get<userEvent[]>('/eventos/all/'+sessionStorage.getItem("EMPRESA_USUARIO")).subscribe({
      next: (response) => {
          this.getUserEvents.set(response.map((event) => {
            return {
              ID_EVENTOS: event.ID_EVENTOS,
              NOME: event.NOME,
              COR: event.COR,
              DATA_INICIO: new Date(event.DATA_INICIO).toISOString().split('T')[0],
              DATA_TERMINO: new Date(event.DATA_TERMINO).toISOString().split('T')[0],
              DESCRICAO: event.DESCRICAO
            };
          }));
      },
      error: (error) => {
          console.error('getUserEventsApi Error:', error);
      }
  });
  }  
}
