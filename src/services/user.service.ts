import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {USERS} from "../fake-data/fake-data";
import {User} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = USERS
  constructor() { }

  getUsers() {
    return of (this.users);
  }
  createUser(user: User) {
    user.id = Date.now();
    this.users = [...this.users, user];
    return of (this.users);
  }
  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
    return of (this.users);
  }
  deleteUser(id: any) {
    this.users = this.users.filter((u) => u.id !== id);
    return of (this.users);
  }
}
