import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { PupUpComponent } from './components/pup-up/pup-up.component';
import { UserService } from '../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PupUpComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private userService = inject(UserService);

  userImg = signal("assets/icons/misc/icon-user-template.svg")
  username  = this.userService.userName();
  userFunction = signal("User function")
  isPopupVisible = signal(false);
  private hasMouseEntered = signal(false);
  foto: any = ''
  constructor(public headerTitleService: HeaderTitleService) {
    this.userService.usuario$.subscribe(data=>{
      this.foto = data.FOTO
      this.userImg.set(this.foto ? "/assets/usuarios/"+this.foto : "assets/icons/misc/icon-user-template.svg")
      console.log(this.userImg())
    })
  }

  

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
