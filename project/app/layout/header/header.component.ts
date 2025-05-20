import { Component, signal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { PupUpComponent } from './components/pup-up/pup-up.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PupUpComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userImg   = signal("assets/icons/misc/icon-user-template.svg")
  username  = signal("Username")
  userFunction = signal("User function")
  isPopupVisible = signal(false);
  private hasMouseEntered = signal(false);

  constructor(public headerTitleService: HeaderTitleService) { }

  togglePopup() {
    this.isPopupVisible.update(value => !value);
  }

  navegarParaConfiguracoes() {
    this.isPopupVisible.set(false);
  }

  sair() {
    this.isPopupVisible.set(false);
    console.log('Usuário saiu.');
  }

  mouseEntered() {
    console.log('Mouse entered');
    this.hasMouseEntered.set(true);
  }

  mouseLeft() {
    if(this.hasMouseEntered()) {
      console.log('Mouse left');
      this.togglePopup();
      this.hasMouseEntered.set(false);
    }
  }
}
