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
