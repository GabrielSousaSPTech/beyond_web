import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private userService = inject(UserService);
  adminLevel = this.userService.nivelPermissao();

  showOptions = signal(false);
  private leaveTimeout: any;
  private cliked = false;

  expandSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const sidebarWidth = sidebar.offsetWidth;
    let expandedWidth: number;
    if (sidebarWidth === 90) {
      const arrow = document.querySelector('.bi-arrow-right') as HTMLElement;
      arrow.classList.remove('bi-arrow-right');
      arrow.classList.add('bi-arrow-left');
      expandedWidth = 160;
      this.cliked = true;
    } else {
      const arrow = document.querySelector('.bi-arrow-left') as HTMLElement;
      arrow.classList.remove('bi-arrow-left');
      arrow.classList.add('bi-arrow-right');
      this.cliked = false;
      expandedWidth = 90;
    }
    
    sidebar.style.width = `${expandedWidth}px`;
    this.showOptions.set(false); 
    const navTextElements = document.querySelectorAll('.nav-text') as NodeListOf<HTMLElement>;
    navTextElements.forEach(element => {
      element.style.display = sidebar.offsetWidth === 90 ? 'initial' : 'none';
    });

    this.clearLeaveTimeout();
  }

  sidebarOut(){
    if (this.cliked) {
      this.expandSidebar();
    }
  }

  toggleOptions() {
    this.showOptions.set(!this.showOptions());
    this.clearLeaveTimeout();
  }

  onMouseOver() {
    this.showOptions.set(true);
    this.clearLeaveTimeout();
  }

  onMouseLeave() {
    this.leaveTimeout = setTimeout(() => {
      this.showOptions.set(false);
    }, 200);
  }

  clearLeaveTimeout() {
    if (this.leaveTimeout) {
      clearTimeout(this.leaveTimeout);
    }
  }
}
