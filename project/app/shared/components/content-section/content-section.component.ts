import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEventService } from '../../../modules/home/services/card-event/card-event.service';

export type MaxWidthValue = `${number}${'px' | 'rem' | 'em' | '%'}`;

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrl: './content-section.component.css'
})
export class ContentSectionComponent {
  @Input() iconUrl: string = '';
  @Input() title: string = '';
  @Input() padding: 'small' | 'medium' | 'large' | 'none' = 'medium';
  @Input() maxWidth: MaxWidthValue | null = '45rem';
  @Input() btnEvent: boolean = false;
  @Output() btnEventClick = new EventEmitter<void>();

  cardEventService = inject(CardEventService);

  buttonClick(){
    this.btnEventClick.emit();
  }

  get paddingClass() {
    return `padding-${this.padding}`;
  }

  get cardMaxWidthStyle() {
    return `max-width: ${this.maxWidth};`;
  }
}
