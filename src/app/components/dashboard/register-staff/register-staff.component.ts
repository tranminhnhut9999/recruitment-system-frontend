import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {RoleService} from "../../../shared/services/role.service";
import {filter, Observable, ReplaySubject, Subject} from "rxjs";
import {RoleResponse} from "../../../shared/model/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {ConfigurationService} from "../../../shared/services/configuration.service";
import {WorkingAddress} from "../../../shared/model/working-address.model";
import {AuthService} from "../../../shared/services/auth.service";
import {ROLE} from "../../../shared/constants/role-config";

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.scss']
})
export class RegisterStaffComponent {
  departments: any[] = [];
  registerNewAccountForm!: FormGroup;
  roles: RoleResponse[] = [];
  eduOptions: any[] = [
    {value: 'Tiểu học', code: 'PRIMARY'},
    {value: 'Trung học cơ sở', code: 'SECONDARY'},
    {value: 'Đang học đại học', code: 'UNDERGRADUATE'}, {
      value: 'Đại học',
      code: 'POSTGRADUATE'
    }, {value: 'Sau đại học', code: 'DOCTORATE'}]
  workingAddress$?: Subject<WorkingAddress[]>;

  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private fb: FormBuilder,
              private roleService: RoleService,
              private accountService: AccountService,
              private messageService: MessageService,
              private configurationService: ConfigurationService,
              private authService: AuthService,) {
    this.registerNewAccountForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      workingAddress: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      // department: new FormControl("", [Validators.required]),
      dob: new FormControl([Validators.required]),
      citizenID: new FormControl("", [Validators.required]),
      eduLevelCode: new FormControl("", [Validators.required]),
    });

    this.subscribeEvents();
  }

  handleClickingBack() {
    this.confirmService.confirm({
      message: 'Trở về sẽ mất dữ liệu chưa lưu trữ, bạn có muốn trở về ? ',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Xác nhận",
      rejectLabel: "Hủy",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.location.back();
      }
    });
  }

  subscribeEvents() {
    this.roleService.roles$.subscribe(roles => {
      // ADMIN can create every user
      let isAdmin = this.authService.userHasRoles([ROLE.ADMIN]);
      this.roles = roles.filter(role => {
        if (role.code == ROLE.ADMIN) {
          return false;
        } else if (isAdmin) {
          return true;
        } else if (role.code == ROLE.HR_MANAGER) {
          return false
        }
        return true;
      });
    });
    this.workingAddress$ = this.configurationService.workingAddresses$;
  }

  handleSubmit() {
    let cloneForm = {...this.registerNewAccountForm.value};
    this, this.setUtcValue(cloneForm);
    console.log(cloneForm);
    this.accountService.createAccount(cloneForm).subscribe({
      next: value => {
        this.messageService.add({
          severity: "success",
          summary: "Thành Công",
          detail: "Tạo tài khoản thành công"
        });
        this.accountService.loadAccount();
      },
      error: err => {
        this.messageService.add({
          severity: "error",
          summary: "Thất Bại",
          detail: "Tạo tài khoản thất bại"
        })
      }
    })
  }

  setUtcValue(formValue: any) {
    formValue.dob = this.convertToUTC(formValue.dob);
  }

  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }
}
