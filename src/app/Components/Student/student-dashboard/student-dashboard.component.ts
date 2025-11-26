import { Component } from '@angular/core';
import { StudentActionComponent } from './student-action/student-action.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [StudentActionComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {

}
