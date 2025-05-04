import { Component, inject, OnInit, signal } from '@angular/core';
import { CardNotificationService } from '../../services/card-notification/card-notification.service';
import { userNotification } from '../../models/user-notification.type';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-card-notification',
  imports: [CommonModule],
  templateUrl: './card-notification.component.html',
  styleUrl: './card-notification.component.css'
})
export class CardNotificationComponent implements OnInit {
  cardNotificationService = inject(CardNotificationService)
  notificationList = signal<Array<userNotification>>([]);

  ngOnInit():void {
    this.notificationList.set(this.cardNotificationService.getUserNotifications())
  }

  getDateObject(date: string | null): Date | null{
    if(date){
      return new Date(date);
    }
    return null
  }

  deleteNotification(id: number): void {
    this.notificationList.update(list => list.filter(notification => notification.id !== id));
  }
}
