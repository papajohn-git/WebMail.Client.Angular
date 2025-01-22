import { Injectable, inject , signal , effect } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apirespone/apiresponse';
import { environment } from '../../../environments/environment.development';
import { UserSignUpDTO, Credentials, LoggedInUser, UserProfileDTO, SupervisorUsersUpdateDTO } from '../interfaces/user/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { EmailsFullNameDTO } from '../interfaces/user/user';
import { SupervisorUsersListReadOnlyDTO } from '../../shared/interfaces/user/user';
import { SupervisorUsersDetailsReadOnlyDTO } from '../interfaces/user/user';

const API_URL=`${environment.apiURL}/api/User`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  user = signal<LoggedInUser | null>(null)
  mailsFullnames = signal<EmailsFullNameDTO[]>([])
  userProfile = <UserProfileDTO | null>(null)

  constructor(){
    const token = localStorage.getItem("access_token")
    console.log('Token:', token);
    if (token){
        const decodedToken : any = jwtDecode(token)
            this.user.set({
              userId: decodedToken[ 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                  email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                  role: decodedToken[ 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User '
            })
    }
    effect(() =>{
        if (this.user()){
            // console.log("User logged in: ", this.user()?.role);          
        } else {
            // console.log('No user logged in');
        }
    })
}

loginUser(credentials: Credentials){
  return this.http.post<{token: string}>
  (`${API_URL}/Login`,credentials)
}

logoutUser(){
  this.user.set(null);
  localStorage.removeItem('access_token');
  this.router.navigate(['home']);
}

        registerUser(user: UserSignUpDTO) {
          return this.http.post<ApiResponse>
          (`${API_URL}/Register`, user)
      }

      getAllEmailsFullNames(): void {
        this.http.get<EmailsFullNameDTO[]>
        (`${API_URL}/GetUserMailsFullName`)
        .subscribe(data => {
          this.mailsFullnames.set(data);
          console.log('Fetched emails full names:', data);
        });
      }

      getUserProfile() {
            return this.http.get<UserProfileDTO>
            (`${API_URL}/GetProfile`);
      }

      updateUserProfile(profile: UserProfileDTO) {
                return this.http.post<ApiResponse>
                (`${API_URL}/UpdateProfile`, profile);
      }

      getSupervisorUsersList() {
            return this.http.get<SupervisorUsersListReadOnlyDTO[]>
            (`${API_URL}/GetSupervisorUsersList`);
      }


      getSupervisorUsersDetails(userId: number) {
            return this.http.get<SupervisorUsersDetailsReadOnlyDTO>
            (`${API_URL}/GetSupervisorUsersDetailsList/?userId=${userId}`);
      }

      updateUser(userDetails: SupervisorUsersUpdateDTO) {
        return this.http.post<ApiResponse>
        (`${API_URL}/UpdateSupervisorUsersDetails`, userDetails);
      }

      deleteUser(userId: number) {
        return this.http.delete<ApiResponse>
        (`${API_URL}/DeleteUser/?userId=${userId}`);
      }
}
