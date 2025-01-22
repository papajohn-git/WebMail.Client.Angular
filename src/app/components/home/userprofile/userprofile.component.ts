import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators , AbstractControl, ValidationErrors} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiResponse } from '../../../shared/interfaces/apirespone/apiresponse';
import { RouterLink } from '@angular/router';
// import { first } from 'rxjs';
import { UserService } from '../../../shared/services/user.service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {

  apiResponse: ApiResponse | null = null;
  userService = inject(UserService)
  router = inject(Router);


  userProfileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
  });

  

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        // console.log('User Profile Response', profile);
          this.userProfileForm.patchValue(profile);
      },
      error: (error) => {
        console.error('User Profile Error', error);
      }
    });
  }


  onSubmit() {
    if (this.userProfileForm.invalid) {
      return;
    }
    console.log('User Profile form submitted');

    this.userService.updateUserProfile(this.userProfileForm.value).subscribe({
      next: response => {
        // console.log('Full response: ', response);
        if (response.success) {
            this.apiResponse = {
                message: response.message,
                success: true
            };
        } else {
            this.apiResponse = {
                message: response.message,
                success: false
            };
        }
    },
    error: error => {
        console.log('Error: ', error);
        console.log('Error message: ', error.error.Detail);
        if (error.error) {
          this.apiResponse = {
              message: error.error.Detail,
              success: false
          };
        } else {
            this.apiResponse = {
                message: 'An unexpected error occurred.',
                success: false
            };
        }
    }
    });
  }
}
