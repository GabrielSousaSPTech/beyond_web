import { Component, EventEmitter, inject, OnInit, Output, signal, WritableSignal, computed } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';
import { UserModelComponent } from "../user-model/user-model.component";
import { userRegisteredApi } from '../../../../shared/models/users-registered';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-user',
  imports: [UserModelComponent, AsyncPipe, CommonModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent implements OnInit {
  cardUserService = inject(CardUserService);
  
  usersList = toSignal(this.cardUserService.getUsersRegisted$, { initialValue: [] as userRegisteredApi[] });
  
  @Output() openModel = new EventEmitter<userRegisteredApi>();
 
  ngOnInit(): void {
    this.cardUserService.getUsersRegistered();
  }
 
  btnConfig(user: userRegisteredApi) {
    this.openModel.emit(user);
  }
}