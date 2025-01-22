import { Component , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service.service';
import { FormGroup, FormControl, Validators , AbstractControl, ValidationErrors} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Credentials, LoggedInUser } from '../../../shared/interfaces/user/user';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse } from '../../../shared/interfaces/apirespone/apiresponse';


@Component({
  selector: 'app-signin',
  imports: [ ReactiveFormsModule , CommonModule,  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  private http: HttpClient = inject(HttpClient);

  userService = inject(UserService);
  router = inject(Router);
  apiResponse: ApiResponse | null = null;

  invalidLogin = false;
  // user = this.userService.user;

  // signinForm: FormGroup = new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]),
  //     password: new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(10)])});

  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])});

      onSubmit(){
        const credentials = this.signinForm.value as Credentials;
        // console.log(credentials);
        this.userService.loginUser(credentials).subscribe({
            next: (response) => {
              // console.log('Login Response', response);
                const access_token = response.token;
                // console.log(access_token);
                localStorage.setItem("access_token", access_token);
                
                const decodedToken: any = jwtDecode(access_token);
                // console.log(decodedToken)
                
                this.userService.user.set({
                  userId: decodedToken[ 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                  email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                  role: decodedToken[ 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User '
                })

                this.userService.getUserProfile().subscribe(profile => {
                  // console.log('User Profile', profile);
                  if (!profile || Object.keys(profile).length === 0) {
                    this.router.navigate(['/user-profile']);
                  } else {
                    this.router.navigate(['home']);
                  }
                });
            },
            error: (error) =>{
                console.log('Login Error', error);
                this.invalidLogin = true;
            }
        })
    }
}
