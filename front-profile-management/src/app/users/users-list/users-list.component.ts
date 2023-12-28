import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  // Get :
  // deleteUser method,
  // triggerUserModal method,
  // users User[] from the parent component
  @Input()
  deleteUser!: (id: number, index: number) => void;
  @Input()
  users: User[] = [];
  @Input()
  triggerUserModal!: (id: number) => void;

  sortedData: User[];

  constructor() {
    this.sortedData = [];
  }

  // update the value of sortedData on typeUsers change
  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'users') {
        this.sortedData = changes[property].currentValue;
      }
    }
  }

  // Call the parent method to delete a User
  deleteU(id: number, name: string, index: number) {
    if (confirm(`Do you realy want to remove the user ${name}`)) {
      this.deleteUser(id, index);
    }
  }

  // Call the parent method to trigger the User modal
  // so the user can edit the User
  updateUser(id: number, index: number) {
    this.triggerUserModal(id);
  }

  // sort the User
  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'typeUser':
          return compare(a.typeUser.type, b.typeUser.type, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
