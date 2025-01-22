import { UserRole } from "../enums/user-role.enums";

export interface UserSignUpDTO {
    email: string;
    password: string;
    confirmPassword: string;
  }


  export interface Credentials {
    email: string,
    password: string
}

export interface LoggedInUser {
  userId: string,
  email: string,
  role: string
}

export interface EmailsFullNameDTO {
  email: string,
  fullName?: string
}

export interface UserProfileDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface SupervisorUsersListReadOnlyDTO {
  id: number;
  email?: string; 
  userRole?: UserRole; 
  userCreatedAt?: Date; 
}

export interface SupervisorUsersDetailsReadOnlyDTO {
  email?: string;
  confirmPassword?: string;
  userRole?: UserRole;
  userCreatedAt?: Date;
  userUpdatedAt?: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  userProfileCreatedAt?: Date;
  userProfileUpdatedAt?: Date;
}

export interface SupervisorUsersUpdateDTO {
  id?: number;
  email?: string;
  userRole?: UserRole;
}