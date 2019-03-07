import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { UserGuard } from './guard/user.guard';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'users'},
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'users/:login',
    component: UserDetailsComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'edit/:login',
    component: UserEditComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'post',
    component: UserPostComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
