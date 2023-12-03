import { Component } from '@angular/core';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { UsersFormComponent } from '../../components/users-form/users-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [UsersListComponent, UsersFormComponent],
})
export class HomeComponent {
  constructor() {}

  ngOnInit() {}
}
