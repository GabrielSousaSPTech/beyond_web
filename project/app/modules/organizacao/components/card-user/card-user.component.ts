import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';
import { UserModelComponent } from "../user-model/user-model.component";
import { userRegisteredApi } from '../../../../shared/models/users-registered';

@Component({
  selector: 'app-card-user',
  imports: [UserModelComponent],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  cardUserService = inject(CardUserService)
  usersList = this.cardUserService.getUsersActivity; 
  @Output() openModel = new EventEmitter<userRegisteredApi>(); 
  
  ngOnInit(): void {
    this.cardUserService.getUsersRegistered();
  }

  btnConfig(user: userRegisteredApi){
    this.openModel.emit(user);
  }


}
