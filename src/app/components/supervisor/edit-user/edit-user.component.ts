import { Component, OnInit , inject, NgModule} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorUsersUpdateDTO } from '../../../shared/interfaces/user/user';
import { UserService } from '../../../shared/services/user.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  userDetails: SupervisorUsersUpdateDTO | undefined;

    userService = inject(UserService);
    route = inject(ActivatedRoute);
    router = inject(Router);

    ngOnInit(): void {
      const stringUserId = this.route.snapshot.paramMap.get('id')!;
      const userId = stringUserId ? parseInt(stringUserId, 10) : null;
      this.userService.getSupervisorUsersDetails(userId!).subscribe(data => {
        this.userDetails = {
          id: userId!,
          email: data.email,
          userRole: data.userRole
        };
        // console.log('User details', this.userDetails);
      });
    }

    onSubmit(): void {
      console.log('Updating user log before update', this.userDetails);
      this.userService.updateUser(this.userDetails!).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/supervisor']); // Navigate back to the supervisor page after update
        },
        error: (error) => {
          console.error('Error updating user', error);
        }
      });
    }
  
    goBack(): void {
      this.router.navigate(['/supervisor']); // Adjust the route as needed
    }
}


