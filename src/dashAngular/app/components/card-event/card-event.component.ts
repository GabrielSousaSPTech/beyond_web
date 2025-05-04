import { Component, inject, OnInit, signal } from '@angular/core';
import { userEvent } from '../../models/user-event.type';
import { CardEventService } from '../../services/card-event/card-event.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-card-event',
  imports: [],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent implements OnInit {
  cardEventService = inject(CardEventService) // tras o evento
  eventList = signal<Array<userEvent>>([]); // propiedade que agrupa e guarda eventos em array

  ngOnInit():void {
    this.eventList.set(this.cardEventService.getUserEvents()) // tras o array de eventos
  }

  deleteEvent(id: number): void {
      this.eventList.update(list => list.filter(event => event.id !== id));
  }

}
