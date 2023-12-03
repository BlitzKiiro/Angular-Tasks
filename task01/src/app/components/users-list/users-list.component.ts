import { Component } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { User } from '../../models/user';
import { EventsService } from '../../services/events/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UsersListComponent {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private events: EventsService
  ) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();

    this.events.subscribe('user_saved', () => {
      this.users = this.usersService.getUsers();
      console.log(this.users);
    });
  }

  removeUser(id: number) {
    this.usersService.removeUser(id);
    this.users = this.usersService.getUsers();
  }

  editInForm(id: number) {
    this.events.publish(
      'fill_form',
      this.users.find((user) => user.id === id)
    );
  }
}
