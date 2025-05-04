import { Component, input, signal } from '@angular/core';
import { HeaderTitleService } from '../../services/header-title/header-title.service';
import { RouterLink } from '@angular/router';
import { PupUpComponent } from '../pup-up/pup-up.component'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, PupUpComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userImg   = signal("assets/header/user-img-template.svg")
  username  = signal("Username")
  userFunction = signal("User function")
  isPopupVisible = signal(false);

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
}
