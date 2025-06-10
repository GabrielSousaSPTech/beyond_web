import { Component, inject, OnInit, } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { ContentSectionComponent } from "../../shared/components/content-section/content-section.component";
import { CardEventComponent } from "./components/card-event/card-event.component";
import { CardFilterComponent } from "./components/card-filter/card-filter.component";
import { CardNotificationComponent } from './components/card-notification/card-notification.component';
import { EventModalComponent } from "./components/event-modal/event-modal.component";
import { CardEventService } from './services/card-event/card-event.service';
import { UserFiltersService } from '../../core/services/user-filters/user-filters.service';
import { DatePipe } from '@angular/common';
import { BasicDataService } from '../../core/services/basicData/basicData.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-home',
  imports: [ContentSectionComponent, CardEventComponent, CardFilterComponent, CardNotificationComponent, EventModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CardEventService, UserFiltersService, DatePipe, BasicDataService]
})

export class HomeComponent implements OnInit{
  userService = inject(UserService);
  eventService = inject(CardEventService);
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Pagina Principal');
  }
}
