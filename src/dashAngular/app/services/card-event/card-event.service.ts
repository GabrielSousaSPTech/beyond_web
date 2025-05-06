import { Injectable, Signal, signal } from '@angular/core';
import { userEvent } from '../../models/user-event.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardEventService {
  private eventList: Array<userEvent> = [{
    id: 0,
    name: "titulo",
    descricao: "opa",
    cor: "#AAAAAA",
    dataInicio: "01/01/0001",
    dataTermino: "22/02/2026",
  },
  {
    id: 1,
    name: "titulo",
    descricao: "opa",
    cor: "#312312",
    dataInicio: "01/01/0001",
    dataTermino: "02/01/0001",
  },
  {
    id: 2,
    name: "titulo",
    descricao: "opa",
    cor: "#AAAAAA",
    dataInicio: "01/01/0001",
    dataTermino: "02/01/0001",
  },
  {
    id: 3,
    name: "titulo",
    descricao: "opa",
    cor: "#312312",
    dataInicio: "01/01/0001",
    dataTermino: "02/01/0001",
  },
  {
    id: 4,
    name: "titulo",
    descricao: "opa",
    cor: "#AAAAAA",
    dataInicio: "01/01/0001",
    dataTermino: "02/01/0001",
  }]

  getUserEvents = signal(this.eventList);
  private triggerAddEvent = new Subject<void>();
  triggerAddEvent$ = this.triggerAddEvent.asObservable();

  editEvent(eventEdited: userEvent, id: number): void {
    this.eventList = this.eventList.map((event) => 
      event.id === id ? eventEdited : event
    );
    this.getUserEvents.set([...this.eventList]);
  }

  addEvent(event: userEvent): void {
    this.eventList = [...this.eventList, event];
    this.getUserEvents.set([...this.eventList]);
  }

  triggerOpenAddEvent(): void {
    console.log("triggerOpenAddEvent")
    this.triggerAddEvent.next();
  }

}
