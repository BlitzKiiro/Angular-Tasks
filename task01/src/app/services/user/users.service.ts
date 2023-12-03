import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];

  constructor() {}

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  addUser({
    fullName,
    phone,
    email,
    dateOfBirth,
    address,
  }: {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    address: string;
  }) {
    const newUser = new User(
      this.users.length + 1,
      fullName,
      phone,
      email,
      dateOfBirth,
      address
    );

    console.log('new user', newUser);

    this.users.push(newUser);
  }

  editUser(user: User) {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
  }

  removeUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
