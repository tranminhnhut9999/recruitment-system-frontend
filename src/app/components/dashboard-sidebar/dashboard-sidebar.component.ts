import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent {
  collapsed: boolean = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
