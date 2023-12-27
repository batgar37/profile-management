import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeUser } from '../type-user';

@Component({
  selector: 'app-type-users-form',
  templateUrl: './type-users-form.component.html',
  styleUrls: ['./type-users-form.component.css'],
})
export class TypeUsersFormComponent {
  private modalService = inject(NgbModal);

  @Input()
  typeUserGroup: FormGroup = new FormGroup({});
  @Input()
  createOrUpdateTypeUser!: (typeUser: TypeUser) => void;

  @ViewChild('openModal')
  button!: ElementRef;

  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
          this.typeUserGroup.reset({ id: -1 });
        }
      );
  }

  openModal() {
    this.button.nativeElement.click();
  }

  cancel = () => {
    this.modalService.dismissAll();
    this.typeUserGroup.reset({ id: -1 });
  };

  createOrUpdateTypeUserSubmit = () => {
    let typeUser = this.typeUserGroup.value as TypeUser;
    console.log(typeUser);

    if (this.typeUserGroup.valid) {
      this.createOrUpdateTypeUser(typeUser);
      // this.userGroup.reset();
      this.modalService.dismissAll();
    } else {
      alert('The user form is not valid');
    }
  };

  getTypeErrorMessage() {
    if (this.typeUserGroup.controls['type'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.typeUserGroup.controls['type'].hasError('minlength')
      ? 'The name mush have at least 3 character'
      : '';
  }
}
