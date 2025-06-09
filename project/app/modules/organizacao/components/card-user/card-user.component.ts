import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';
import { UserModelComponent } from "../user-model/user-model.component";
import { userRegisteredApi } from '../../../../shared/models/users-registered';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-user',
  imports: [UserModelComponent, AsyncPipe, CommonModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  cardUserService = inject(CardUserService)
  usersList = this.cardUserService.getUsersRegisted$; 
  @Output() openModel = new EventEmitter<userRegisteredApi>(); 
  
  ngOnInit(): void {
    this.cardUserService.getUsersRegistered();
  }
  

  btnConfig(user: userRegisteredApi){
    this.openModel.emit(user);
  }

  convertToTitleCase(text: string): string {
    if (!text) return '';

    return text.toLowerCase().replace(/\b\w/g, (match) => {
      return match.toUpperCase();
    });
  }

}
