import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service.service';
import { SupervisorUsersDetailsReadOnlyDTO } from '../../../shared/interfaces/user/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-user',
  imports: [CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit{

  userDetails: SupervisorUsersDetailsReadOnlyDTO | undefined;

    userService = inject(UserService);
    route = inject(ActivatedRoute);
    router = inject(Router);

    ngOnInit(): void {
      const userId = +this.route.snapshot.paramMap.get('id')!;
      this.userService.getSupervisorUsersDetails(userId).subscribe({
        next: (userDetails: SupervisorUsersDetailsReadOnlyDTO) => {
          // console.log('User Details Response', userDetails);
          this.userDetails = userDetails;
        },
        error: (error: any) => {
          console.error('User Details Error', error);
        }
      });
    }

    goBack(): void {
      this.router.navigate(['/supervisor']); // Adjust the route as needed
    }

    deleteUser(): void {
      const userId = +this.route.snapshot.paramMap.get('id')!;
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/supervisor']); // Navigate back to the supervisor page after deletion
        },
        error: (error) => {
          console.error('Error deleting user', error);
        }
      });
    }

}
