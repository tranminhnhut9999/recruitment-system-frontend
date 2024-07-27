import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordsMatchValidator} from "../../../../shared/validators/PasswordsMatchValidator";
import {AccountService} from "../../../../shared/services/account.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {
  @Input() visible: boolean = true;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private messageService: MessageService) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      confirmationPassword: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
    }, {validators: passwordsMatchValidator()});
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log("Change:", this.changePasswordForm.value);
      const successToastMsg: any = {
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thay đổi mật khẩu thành công'
      }

      const errorToastMsg: any = {
        severity: 'error',
        summary: 'Thất bại',
        detail: 'Thay đổi mật khẩu thất bại'
      }

      this.accountService.changePassword(this.changePasswordForm.value).subscribe({
        next: result => {
          if (result?.data === 'change password successful') {
            this.messageService.add(successToastMsg);
          } else {
            this.messageService.add(errorToastMsg);
          }
        },
        error: err => {
          this.messageService.add(errorToastMsg);
        }
      })
      this.handleOnClose();
    }
  }

  handleOnClose() {
    this.visible = false;
    this.onClose.emit(false);
  }
}
