import { Component, inject, OnInit, } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent } from "../../shared/components/content-section/content-section.component";
import { CardEventComponent } from "./components/card-event/card-event.component";
import { CardFilterComponent } from "./components/card-filter/card-filter.component";
import { CardNotificationComponent } from './components/card-notification/card-notification.component';
import { EventModalComponent } from "./components/event-modal/event-modal.component";
import { CardEventService } from './services/card-event/card-event.service';

@Component({
  selector: 'app-home',
  imports: [ContentSectionComponent, CardEventComponent, CardFilterComponent, CardNotificationComponent, EventModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CardEventService]
})

export class HomeComponent implements OnInit{
  eventService = inject(CardEventService);
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Pagina Principal');
  }
}
