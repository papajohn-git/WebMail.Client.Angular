import { Component, OnInit , inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorUsersDetailsReadOnlyDTO } from '../../../shared/interfaces/user/user';
import { UserService } from '../../../shared/services/user.service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-user',
  imports: [ CommonModule ],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent implements OnInit {

  userDetails: SupervisorUsersDetailsReadOnlyDTO | undefined;
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getSupervisorUsersDetails(userId).subscribe({
      next: (user) => {
        // console.log('User Details Response', user);
        this.userDetails = user;
      },
      error: (error) => {
        console.error('User Details Error', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/supervisor']); // Adjust the route as needed
  }
}
