import { Injectable, Signal, signal } from '@angular/core';
import { userEvent } from '../../models/user-event.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardEventService {
  private eventList: Array<userEvent> = [
    {
      id: 0,
      name: "Festas de São João",
      descricao: "todo mês de junho",
      cor: "#AAAAAA",
      dataInicio: "2025-06-01",
      dataTermino: "2025-06-30",
    },
    {
    id: 1,
    name: "Festival Folclórico de Parintins",
    descricao: "Festa do Boi-Bumbá",
    cor: "#AAAAAA",
    dataInicio: "2025-06-29",
    dataTermino: "2025-06-29",
  },]

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

  deleteEvent(id: number): void {
    console.log("deleteEvent", id)
    this.eventList = this.eventList.filter((event) => event.id !== id);
    this.getUserEvents.set([...this.eventList]);
  }

  triggerOpenAddEvent(): void {
    console.log("triggerOpenAddEvent")
    this.triggerAddEvent.next();
  }
}
