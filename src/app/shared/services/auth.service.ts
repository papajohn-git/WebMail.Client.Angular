import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  userService = inject(UserService);
  user = this.userService.user;

isAdmin(): boolean {
    return this.user()?.role === 'Admin';
}
}