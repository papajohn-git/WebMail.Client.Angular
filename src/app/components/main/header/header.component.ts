import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [ CommonModule , ReactiveFormsModule , MatMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

userService = inject(UserService)
user = this.userService.user;

logout(){
  this.userService.logoutUser()
}

updateUserProfile(){
  // console.log('Update user profile');
}

}
