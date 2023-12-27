import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TypeUsersComponent } from './type-users/type-users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    title: 'User List',
  },
  {
    path: 'type-user',
    component: TypeUsersComponent,
    title: 'TypeUser List',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
