import { Component, Output, EventEmitter, signal, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pup-up',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pup-up.component.html',
  styleUrls: ['./pup-up.component.css']
})
export class PupUpComponent {

  private userService = inject(UserService);
  username = this.userService.userName();
  email = this.userService.email();
  foto = this.userService.usuario().FOTO

  logOut(){
    sessionStorage.clear();
    window.location.href = '/';
  }

}