import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormGroup, FormControl, Validators , AbstractControl, ValidationErrors} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../shared/interfaces/apirespone/apiresponse';
import { SupervisorUsersListReadOnlyDTO } from '../../shared/interfaces/user/user';
import { UserService } from '../../shared/services/user.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.css'
})
export class SupervisorComponent implements OnInit {

  users: SupervisorUsersListReadOnlyDTO[] = [];
  apiResponse: ApiResponse | null = null;

  userService = inject(UserService);
  router = inject(Router);

  constructor() {
    this.userService.getSupervisorUsersList().subscribe({
      next: (users) => {
        console.log('Users Response', users);
        this.users = users;
      },
      error: (error) => {
        console.error('Users Error', error);
      }
    });
   }

  ngOnInit(): void {
  }


  detailsUser(user: SupervisorUsersListReadOnlyDTO) {
    // console.log('Viewing details for user id', user.id);
    this.router.navigate(['/user-details', user.id]);
  }

  editUser(user: SupervisorUsersListReadOnlyDTO) {
    // console.log('Editing user id', user.id);
    this.router.navigate(['/edit-user', user.id]);
  }

  deleteUser(user: SupervisorUsersListReadOnlyDTO) {
    // console.log('Deleting user id', user.id);
    this.router.navigate(['/delete-user', user.id]);
    
  }

}
