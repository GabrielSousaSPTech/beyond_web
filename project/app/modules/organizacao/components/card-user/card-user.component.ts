import { Component, inject, signal } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';
import { userRegistered } from '../../../../shared/models/users-registered';

@Component({
  selector: 'app-card-user',
  imports: [],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  cardUserService = inject(CardUserService)
  usersList = signal<Array<userRegistered>>([]);
  
  ngOnInit():void {
    this.usersList.set(this.cardUserService.getUsersRegistered())
  }
}
