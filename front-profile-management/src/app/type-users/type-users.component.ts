import { Component, ViewChild, inject } from '@angular/core';
import { TypeUser } from './type-user';
import { TypeUserService } from './type-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeUsersFormComponent } from './type-users-form/type-users-form.component';

@Component({
  selector: 'app-type-users',
  templateUrl: './type-users.component.html',
  styleUrls: ['./type-users.component.css'],
})
export class TypeUsersComponent {
  typeUserService: TypeUserService = inject(TypeUserService);
  typeUsers: TypeUser[] = [];

  // Retrieve the child component to programaticaly
  // click on the button that open the modal
  @ViewChild(TypeUsersFormComponent) typeUserForm!: TypeUsersFormComponent;

  // Create a FormGroup for the typeUser form
  typeUserGroup = new FormGroup({
    id: new FormControl(-1, [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.typeUserService.getAllTypeUser().subscribe((typeUsers) => {
      this.typeUsers = typeUsers as TypeUser[];
    });
  }

  deleteTypeUser = (id: number, index: number): void => {
    this.typeUserService.delete(id).subscribe((response) => {
      this.typeUsers = this.typeUsers.filter((item) => item.id !== id);
    });
  };

  createOrUpdateTypeUser = (typeUser: TypeUser): void => {
    typeUser.id === -1
      ? this.createTypeUser(typeUser)
      : this.updateTypeUser(typeUser);
  };

  createTypeUser = (typeUser: TypeUser): void => {
    this.typeUserService
      .createTypeUser(typeUser)
      .subscribe((createdTypeUser) => {
        this.typeUsers.push(createdTypeUser);
      });
  };

  updateTypeUser = (typeUser: TypeUser) => {
    this.typeUserService
      .updateTypeUser(typeUser)
      .subscribe((updatedTypeUser) => {
        const index = this.typeUsers.findIndex(
          (u) => u.id === updatedTypeUser.id
        );
        this.typeUsers[index] = updatedTypeUser;
      });
  };

  triggerTypeUserModal = (id: number) => {
    // get the last version of the user
    this.typeUserService.getTypeUserById(id).subscribe((typeUser: TypeUser) => {
      let partial = {
        id: id,
        type: typeUser.type,
      };
      // give the information about the user to the form
      this.typeUserGroup.patchValue(partial);

      // open the modal from the child component
      this.typeUserForm.openModal();
    });
  };
}
