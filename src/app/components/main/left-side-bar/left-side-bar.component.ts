import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';



@Component({
  selector: 'app-left-side-bar',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.css'
})
export class LeftSideBarComponent {
  userService = inject(UserService)
  authService = inject(AuthService)
  user = this.userService.user;

  items = [
    {
      routerLink: 'home',
      icon: 'fa-solid fa-house',
      visible: true
    },
    {
      routerLink: 'mail',
      icon: 'fas fa-envelope mr-2',
      visible: true
    },
    {
      routerLink: 'todo',
      icon: 'fas fa-tasks mr-2',
      visible: true
    },
    {
      routerLink: 'supervisor',
      icon: 'fa-solid fa-user-tie',
      visible: true
    }
  ]

  trackByFn(index: number, item: any): number {
    return index;
  }
}
