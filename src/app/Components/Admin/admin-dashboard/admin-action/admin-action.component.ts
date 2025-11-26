import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizListComponent } from '../../../Public/quiz-list/quiz-list';

@Component({
  selector: 'app-admin-action',
  standalone: true,
  imports: [RouterLink, QuizListComponent],
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.css']
})
export class AdminActionComponent {

}
