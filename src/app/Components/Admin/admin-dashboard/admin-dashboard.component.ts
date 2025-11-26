import { Component } from '@angular/core';
import { AdminActionComponent } from './admin-action/admin-action.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminActionComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

}
