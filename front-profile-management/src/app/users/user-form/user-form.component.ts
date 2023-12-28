import {
  Component,
  ElementRef,
  inject,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeUser } from 'src/app/type-users/type-user';
import { TypeUserService } from 'src/app/type-users/type-user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  private modalService = inject(NgbModal);
  private typeUserService = inject(TypeUserService);

  // Get the userGroup FormGroup and the
  // createOrUpdateUser method from the parent component
  @Input()
  userGroup: FormGroup = new FormGroup({});
  @Input()
  createOrUpdateUser!: (user: User) => void;

  // Find the button element with #openModal in view
  @ViewChild('openModal')
  button!: ElementRef;

  closeResult = '';

  typeUserList: TypeUser[] = [];

  // Get the typeUsers to fill the select input
  ngOnInit() {
    this.typeUserService.getAllTypeUser().subscribe((typeUsers) => {
      this.typeUserList = typeUsers as TypeUser[];
    });
  }

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
          this.userGroup.reset({ id: -1 });
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
    this.userGroup.reset({ id: -1 });
  };

  // check the data and call the parent method if correct
  createOrUpdateUserSubmit = () => {
    let user = this.userGroup.value as User;

    if (this.userGroup.valid) {
      this.createOrUpdateUser(user);
      // this.userGroup.reset();
      this.modalService.dismissAll();
    } else {
      alert('The user form is not valid');
    }
  };

  // return a message if an error is present in the email input
  getEmailErrorMessage() {
    if (this.userGroup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.userGroup.controls['email'].hasError('email')
      ? 'You must enter a valid email'
      : null;
  }

  // return a message if an error is present in the name input
  getNameErrorMessage() {
    if (this.userGroup.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.userGroup.controls['name'].hasError('minlength')
      ? 'The name must have at least 3 character'
      : '';
  }
}
