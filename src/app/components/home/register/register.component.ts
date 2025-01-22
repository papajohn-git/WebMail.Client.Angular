import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service.service';
import { UserSignUpDTO } from '../../../shared/interfaces/user/user';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../shared/interfaces/apirespone/apiresponse';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from '@angular/router';

const API_URL = `${environment.apiURL}/user`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {

  userService = inject(UserService)
  http: HttpClient = inject(HttpClient)
  apiResponse: ApiResponse | null = null;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
  }, { validators: this.passwordConfirmPasswordValidator });

  passwordConfirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      form.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null
  }

  // Commented out for now, for less complexity
  // add this.passwordComplexityValidator to the validators array in the password FormControl
  // passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
  //   const password = control.value;
  //   const hasUpperCase = /[A-Z]/.test(password);
  //   const hasLowerCase = /[a-z]/.test(password);
  //   const hasNumber = /\d/.test(password);
  //   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  //   const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  //   return valid ? null : { complexity: true };
  // }

  onSubmit() {
    if (this.registerForm.invalid) {
      // console.log('Form is invalid');
      // console.log(this.registerForm.value);
      return;
    }

    const user: UserSignUpDTO = {
      email: this.registerForm.value.email + environment.emailDomain,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    };

    this.userService.registerUser(user).subscribe({
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
        // console.log('Error: ', error);
        // console.log('Error message: ', error.error.Detail);
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