import {Component, OnInit} from '@angular/core';
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../../services/user.service";
import {NgForOf, NgIf} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {EMPTY_USER} from "../../constants/constants";
import {ToastComponent} from "../toast/toast.component";
import {ToastService} from "../../services/toast.service";
import {ModalConfig, User, UserActionPayload} from "../../models/models";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    UserFormComponent,
    ButtonComponent,
    ToastComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  isUserFormVisible = false;
  modalConfig: ModalConfig = {
    title: 'Create user',
    isCreateMode: true,
  }
  currentUser: User = EMPTY_USER;

  constructor(private userService: UserService, public toastService: ToastService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
      }
    });
  }

  trackById(index: number, user: User) {
    return user.id
  }

  createUser(user: User) {
    this.users.push(user);
    this.toastService.showToast('User created successfully', 'success')
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
    this.toastService.showToast('User updated successfully', 'success')
  }

  deleteUser(id: any) {
    this.users = this.users.filter((u) => u.id !== id);
    this.toastService.showToast('User deleted successfully', 'success')
  }

  closeModal(actionUser: UserActionPayload) {
    this.isUserFormVisible = false;
    if (!actionUser) return
    const {action, user} = actionUser;
    switch (action) {
      case 'create':
        this.createUser(user)
        break;
      case 'update':
        this.updateUser(user);
        break;
      case 'delete':
        this.deleteUser(user.id);
        break;
      default:
        break;
    }
  }

  showModalToCreate() {
    this.isUserFormVisible = true;
    this.currentUser = EMPTY_USER;
    this.modalConfig = {
      title: 'Create user',
      isCreateMode: true,
    }
  }

  showModal(user: User) {
    const {first_name, last_name} = user;
    this.currentUser = {...user};
    this.modalConfig = {
      title: first_name + ' ' + last_name,
      isCreateMode: false,
    }
    this.isUserFormVisible = true;
  }
}
