import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserPostComponent } from './components/user-post/user-post.component';

const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  ''},
  { path: 'users', component: UsersComponent},
  { path: 'users/:login', component: UserDetailsComponent},
  { path: 'post', component: UserPostComponent},
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
