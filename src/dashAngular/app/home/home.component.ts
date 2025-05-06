import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { ContentSectionComponent } from "../shared/content-section/content-section.component";
import { CardEventComponent } from "../components/card-event/card-event.component";
import { CardFilterComponent } from "../components/card-filter/card-filter.component";
import { CardNotificationComponent } from "../components/card-notification/card-notification.component";
import { CardEventService } from '../services/card-event/card-event.service';

@Component({
  selector: 'app-home',
  imports: [ContentSectionComponent, CardEventComponent, CardFilterComponent, CardNotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  constructor(public headerTitleService: HeaderTitleService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Sua Página');
  }
}
