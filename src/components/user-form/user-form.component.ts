import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {EMPTY_USER} from "../../constants/constants";
import {UserService} from "../../services/user.service";
import {uniqueUsernameValidator, passwordStrengthValidator, passwordMatchValidator} from "../../validators/validators";
import {UserActionPayload} from "../../models/models";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage,
    ButtonComponent,
    NgClass
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnChanges{
  userForm!: FormGroup;
  userTypes = ['Admin', 'Driver'];
  submitted = false;
  @Input() currentUser = EMPTY_USER
  @Input() modalConfig: { title: string; isCreateMode: boolean } = { title: 'Create user', isCreateMode: true };
  @Output()closeModal = new EventEmitter<any>();

  constructor(private fb: FormBuilder,private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.userForm = this.fb.group({
      username: [this.currentUser.username, {
        validators: Validators.required,
        asyncValidators: uniqueUsernameValidator(this.userService, this.currentUser.id),
        updateOn: 'blur'
      }],
      first_name: [this.currentUser.first_name, Validators.required],
      last_name: [this.currentUser.last_name, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      password: [this.currentUser.password, [Validators.required, passwordStrengthValidator]],
      repeatPassword: [this.currentUser.password, Validators.required],
      user_type: [this.currentUser.user_type, Validators.required]
    }, { validator: passwordMatchValidator });
  }

  closeForm(actionUser: UserActionPayload | null) {
    this.closeModal.emit(actionUser);
  }

  delete() {
    this.userService.deleteUser(this.currentUser.id).subscribe(() => {
      this.closeForm({
        action: 'delete',
        user: this.currentUser
      })
    })
  }

  create() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.closeForm({
          action: 'create',
          user: this.userForm.value
        })
      })
    }
  }

  update() {
    this.submitted = true;
    if (this.userForm.valid) {
      const newUser = {...this.userForm.value, id: this.currentUser.id}
      this.userService.updateUser(newUser).subscribe(() => {
        this.closeForm({
          action: 'update',
          user: newUser
        })
      })
    }
  }
}
