import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserService } from './core/services/user/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserService]
})
export class AppComponent {
  userService = inject(UserService)
  constructor () {
    this.userService.getUsuario()
    this.userService.usuario$.subscribe((user) => {
      if(!sessionStorage.getItem('ID_USUARIO')) {
        window.history.back();
      }
      
    })
  }
}
