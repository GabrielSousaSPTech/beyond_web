import { Component, inject, Input, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEventService } from '../../services/card-event/card-event.service';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrl: './content-section.component.css'
})
export class ContentSectionComponent {
  @Input() iconUrl: string = '';
  @Input() title: string = '';
  @Input() padding : string = '';
  @Input() btnEvent: string = '';

  cardEventService = inject(CardEventService);

  get cardPaddingStyle(){
    if(this.padding){
      return `padding: ${this.padding}`;
    }
    return null;
  }

  btnAddEvent(){
    this.cardEventService.triggerOpenAddEvent();
  }

}
