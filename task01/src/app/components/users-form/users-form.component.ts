import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {
  required,
  minLength,
  email,
  phoneNumber,
  onlyAlphabetAndSpaces,
  minimumAge,
} from '../../validators';
import { UsersService } from '../../services/user/users.service';
import { EventsService } from '../../services/events/events.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersFormComponent {
  constructor(
    private usersService: UsersService,
    private events: EventsService
  ) {}

  ngOnInit() {
    this.events.subscribe('fill_form', (user: User) => {
      this.editId = user.id;

      this.userForm.patchValue(user);
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe();
  }

  editId: number | null = null;

  userForm = new FormGroup({
    fullName: new FormControl('', [
      required,
      onlyAlphabetAndSpaces,
      minLength(6),
    ]),
    phone: new FormControl('', [required, phoneNumber]),
    email: new FormControl('', [required, email]),
    dateOfBirth: new FormControl('', [required, minimumAge(18)]),
    address: new FormControl('', [required, minimumAge(18)]),
  });

  saveUserInfo() {
    if (!this.userForm.valid) return;

    const user: any = {};
    Object.assign(user, this.userForm.value);

    if (this.editId) {
      user.id = this.editId;
      this.usersService.editUser(user);
    } else {
      this.usersService.addUser(user);
    }

    this.events.publish('user_saved', null);
    this.userForm.reset();
  }

  touchedAndError(fieldName: string) {
    return (
      this.userForm.get(fieldName)?.invalid &&
      (this.userForm.get(fieldName)?.touched ||
        this.userForm.get(fieldName)?.dirty)
    );
  }
}
