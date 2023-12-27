import { Component, Input, SimpleChanges } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TypeUser } from '../type-user';

@Component({
  selector: 'app-type-user-list',
  templateUrl: './type-user-list.component.html',
  styleUrls: ['./type-user-list.component.css'],
})
export class TypeUserListComponent {
  @Input()
  deleteTypeUser!: (id: number, index: number) => void;
  @Input()
  triggerTypeUserModal!: (id: number) => void;
  @Input()
  typeUsers: TypeUser[] = [];

  sortedData: TypeUser[];

  constructor() {
    this.sortedData = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'typeUsers') {
        this.sortedData = changes[property].currentValue;
      }
    }
  }

  deleteTU(id: number, type: string, index: number) {
    if (confirm(`Do you realy want to remove the user type ${type}`)) {
      this.deleteTypeUser(id, index);
    }
  }

  updateTypeUser(id: number, index: number) {
    this.triggerTypeUserModal(id);
  }

  sortData(sort: Sort) {
    const data = this.typeUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'type':
          return compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
