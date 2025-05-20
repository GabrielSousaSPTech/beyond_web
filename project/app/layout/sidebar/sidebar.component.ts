import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  adminLevel = input("admin")

  showOptions = signal(false);
  private leaveTimeout: any;
  private cliked = false;

  expandSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const sidebarWidth = sidebar.offsetWidth;
    let expandedWidth: number;
    if (sidebarWidth === 90) {
      expandedWidth = 160;
      this.cliked = true;
      console.log(this.cliked);
    } else {
      this.cliked = false;
      console.log(this.cliked);
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
    console.log("SideBarOut: "+this.cliked);
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
