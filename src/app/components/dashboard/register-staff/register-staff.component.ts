import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {RoleService} from "../../../shared/services/role.service";
import {ReplaySubject} from "rxjs";
import {RoleResponse} from "../../../shared/model/account.model";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-register-staff',
  templateUrl: './register-staff.component.html',
  styleUrls: ['./register-staff.component.scss']
})
export class RegisterStaffComponent {
  departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}];
  workingPlaces: any[] = [{value: "1460 Đ. Võ Văn Kiệt, Phường 1, Quận 6, Thành phố Hồ Chí Minh"}, {value: "Đường Nguyễn Văn Cừ, Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng"}, {value: "273 Nguyễn Tri Phương, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000"}];
  vietnamCities: any[] = [
    {"value": "Hanoi"},
    {"value": "Ho Chi Minh City"},
    {"value": "Da Nang"},
    {"value": "Hai Phong"},
    {"value": "Can Tho"},
    {"value": "Bien Hoa"},
    {"value": "Nha Trang"},
    {"value": "Hue"},
    {"value": "Vung Tau"},
    {"value": "Quy Nhon"},
    {"value": "Rach Gia"},
    {"value": "Thai Nguyen"},
    {"value": "Nam Dinh"},
    {"value": "Buon Ma Thuot"},
    {"value": "Vinh"},
    {"value": "Ha Long"},
    {"value": "Thanh Hoa"},
    {"value": "Phan Thiet"},
    {"value": "Cam Ranh"},
    {"value": "Long Xuyen"},
    {"value": "Thai Binh"},
    {"value": "Dong Hoi"},
    {"value": "Sa Dec"},
    {"value": "Bac Lieu"},
    {"value": "Bac Giang"},
    {"value": "Bac Ninh"},
    {"value": "Ben Tre"},
    {"value": "Cao Lanh"},
    {"value": "Da Lat"},
    {"value": "Dong Ha"},
    {"value": "Dong Xoai"},
    {"value": "Ha Giang"},
    {"value": "Ha Tinh"},
    {"value": "Hoa Binh"},
    {"value": "Hung Yen"},
    {"value": "Kon Tum"},
    {"value": "Lao Cai"},
    {"value": "Long Khanh"},
    {"value": "Mong Cai"},
    {"value": "My Tho"},
    {"value": "Phan Rang-Thap Cham"},
    {"value": "Phu Ly"},
    {"value": "Pleiku"},
    {"value": "Quang Ngai"},
    {"value": "Son La"},
    {"value": "Tam Ky"},
    {"value": "Tan An"},
    {"value": "Tay Ninh"},
    {"value": "Tuyen Quang"},
    {"value": "Uong Bi"},
    {"value": "Vi Thanh"},
    {"value": "Vinh Long"},
    {"value": "Yen Bai"}
  ];
  registerNewAccountForm!: FormGroup;
  role$?: ReplaySubject<RoleResponse[]>;

  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private fb: FormBuilder,
              private roleService: RoleService,
              private accountService: AccountService,
              private messageService: MessageService) {
    this.registerNewAccountForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      workingAddress: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      dob: new FormControl([Validators.required]),
      citizenID: new FormControl("", [Validators.required]),
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
    this.role$ = this.roleService.roles$;
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
