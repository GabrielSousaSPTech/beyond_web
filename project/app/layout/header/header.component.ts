import { Component, inject, signal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { PupUpComponent } from './components/pup-up/pup-up.component';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PupUpComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private userService = inject(UserService);
  userImg   = signal("assets/icons/misc/icon-user-template.svg")
  username  = this.userService.userName();
  userFunction = signal("User function")
  isPopupVisible = signal(false);
  private hasMouseEntered = signal(false);

  constructor(public headerTitleService: HeaderTitleService) { }

  togglePopup() {
    this.isPopupVisible.update(value => !value);
  }

  mouseEntered() {
    this.hasMouseEntered.set(true);
  }

  mouseLeft() {
    if(this.hasMouseEntered()) {
      this.togglePopup();
      this.hasMouseEntered.set(false);
    }
  }
}
