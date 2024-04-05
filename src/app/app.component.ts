import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserFormComponent} from "../components/user-form/user-form.component";
import {UsersListComponent} from "../components/users-list/users-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserFormComponent, UsersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ang-test-users';
}
