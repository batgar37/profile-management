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

  // Get the typeUserGroup FormGroup and the
  // createOrUpdateTypeUser method from the parent component
  @Input()
  typeUserGroup: FormGroup = new FormGroup({});
  @Input()
  createOrUpdateTypeUser!: (typeUser: TypeUser) => void;

  // Find the button element with #openModal in view
  @ViewChild('openModal')
  button!: ElementRef;

  closeResult = '';

  // Open the modal and get info on close
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

  // Click on the button to open the modal programaticaly
  openModal() {
    this.button.nativeElement.click();
  }

  // Close the modal and empty the form
  cancel = () => {
    this.modalService.dismissAll();
    this.typeUserGroup.reset({ id: -1 });
  };

  // check the data and call the parent method if correct
  createOrUpdateTypeUserSubmit = () => {
    if (this.typeUserGroup.valid) {
      let typeUser = this.typeUserGroup.value as TypeUser;
      this.createOrUpdateTypeUser(typeUser);
      this.modalService.dismissAll();
    } else {
      alert('The type form is not valid');
    }
  };

  // return a message if an error is present in the type input
  getTypeErrorMessage() {
    if (this.typeUserGroup.controls['type'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.typeUserGroup.controls['type'].hasError('minlength')
      ? 'The type must have at least 3 character'
      : '';
  }
}
