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

  @Input()
  userGroup: FormGroup = new FormGroup({});
  @Input()
  createOrUpdateUser!: (user: User) => void;

  @ViewChild('openModal')
  button!: ElementRef;

  closeResult = '';

  typeUserList: TypeUser[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'userGroup') {
        this.userGroup = changes[property].currentValue;
      }
    }
  }

  ngOnInit() {
    this.typeUserService.getAllTypeUser().subscribe((typeUsers) => {
      this.typeUserList = typeUsers as TypeUser[];
    });
  }

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

  openModal() {
    this.button.nativeElement.click();
  }

  createOrUpdateUserSubmit = () => {
    let user = this.userGroup.value as User;
    console.log(user);

    if (this.userGroup.valid) {
      this.createOrUpdateUser(user);
      // this.userGroup.reset();
      this.modalService.dismissAll();
    } else {
      alert('The user form is not valid');
    }
  };

  cancel = () => {
    this.modalService.dismissAll();
    this.userGroup.reset({ id: -1 });
  };

  getEmailErrorMessage() {
    if (this.userGroup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.userGroup.controls['email'].hasError('email')
      ? 'Not a valid email'
      : null;
  }

  getNameErrorMessage() {
    if (this.userGroup.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.userGroup.controls['name'].hasError('minlength')
      ? 'The name mush have at least 3 character'
      : '';
  }
}
