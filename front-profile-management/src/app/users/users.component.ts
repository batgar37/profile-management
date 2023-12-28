import { Component, ViewChild, inject } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userService: UsersService = inject(UsersService);
  users: User[] = [];

  // Retrieve the child component to programaticaly
  // click on the button that open the modal
  @ViewChild(UserFormComponent) userForm!: UserFormComponent;

  // Create a FormGroup for the user form
  userGroup = new FormGroup({
    id: new FormControl(-1, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    typeUser: new FormControl('', [Validators.required]),
  });

  // Get all Users on init
  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users as User[];
    });
  }

  // Call the API to delete a User
  deleteUser = (id: number, index: number): void => {
    this.userService.delete(id).subscribe((response) => {
      this.users = this.users.filter((item) => item.id !== id);
    });
  };
  // Use the correct method to update or create a User
  createOrUpdateUser = (user: User): void => {
    user.id === -1 ? this.createUser(user) : this.updateUser(user);
  };

  // Call the API to create a User
  createUser = (user: User): void => {
    this.userService.create(user).subscribe((createdUser) => {
      this.users.push(createdUser);
    });
  };

  // Call the API to update a User
  updateUser = (user: User) => {
    this.userService.update(user).subscribe((updatedUser) => {
      const index = this.users.findIndex((u) => u.id === updatedUser.id);
      this.users[index] = updatedUser;
    });
  };

  triggerUserModal = (id: number) => {
    // get the last version of the user
    this.userService.getUserById(id).subscribe((user: User) => {
      let partial = {
        id: id,
        email: user.email,
        name: user.name,
        typeUser: user.typeUser ? user.typeUser.type : null,
      };
      // give the information about the user to the form
      this.userGroup.patchValue(partial);

      // open the modal from the child component
      this.userForm.openModal();
    });
  };
}
