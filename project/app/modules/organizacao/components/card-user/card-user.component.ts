import { Component, inject, OnInit } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';

@Component({
  selector: 'app-card-user',
  imports: [],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  cardUserService = inject(CardUserService)
    usersList = this.cardUserService.getUsersActivity; 
  
  ngOnInit(): void {
  console.log('ngOnInit chamado');
  this.cardUserService.getUsersRegistered();
}
}
