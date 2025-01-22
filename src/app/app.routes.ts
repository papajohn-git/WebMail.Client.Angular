import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/homepage/homepage.component';
import { MailComponent } from './components/mail/mail.component';
import { TodoComponent } from './components/todo/todo.component';
import { RegisterComponent } from './components/home/register/register.component';
import { SigninComponent } from './components/home/signin/signin.component';
import { WriteEmailComponent } from './components/mail/components/write-email/write-email/write-email.component';
import { UserprofileComponent } from './components/home/userprofile/userprofile.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { DetailsUserComponent } from './components/supervisor/details-user/details-user.component';
import { DeleteUserComponent } from './components/supervisor/delete-user/delete-user.component';
import { EditUserComponent } from './components/supervisor/edit-user/edit-user.component';
import { RoleGuard } from './shared/services/guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    // { path : '**', redirectTo: '/home' }, // Wildcard route
    { path: 'home', component: HomeComponent },
    { path : 'mail', component: MailComponent },
    { path : 'todo', component: TodoComponent },
    { path : 'home/register', component: RegisterComponent },
    { path : 'home/signin', component: SigninComponent },
    { path: 'mail/new-mail', component: WriteEmailComponent},
    { path: 'user-profile', component: UserprofileComponent},
    {path: 'supervisor', component: SupervisorComponent,
    canActivate: [RoleGuard]},
    { path: 'user-details/:id', component: DetailsUserComponent },
    {path: 'delete-user/:id', component: DeleteUserComponent},
    {path: 'edit-user/:id', component: EditUserComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
