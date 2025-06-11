import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import { userEvent } from '../../../../shared/models/user-event.type';
import { CardEventService } from '../../services/card-event/card-event.service';
import { UserService } from '../../../../core/services/user/user.service';

@Component({
  selector: 'app-card-event',
  imports: [CommonModule],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEventComponent {
  private cardEventService = inject(CardEventService)
  protected eventList = this.cardEventService.getUserEvents;
  private userService = inject(UserService);

  showButtons: WritableSignal<boolean> = signal(false);


  constructor() {
    this.userService.usuario$.subscribe(user => {
      if(user.TIPO == "Privilegiado" || user.TIPO == "Controle Geral" || user.TIPO == "Controle de Eventos"){
        this.showButtons.set(true);
      }
    })
  }

  deleteEvent(event: userEvent): void {
    this.cardEventService.deleteEvent(event.ID_EVENTOS);
  }

  editEvent(eventEdit: userEvent): void {
    this.cardEventService.editEvent(eventEdit);
  }

  getDateObject(date: string | null): Date | null{
    if(date){
      return new Date(date.replace(/-/g, '/'));
    }
    return null
  }
}
