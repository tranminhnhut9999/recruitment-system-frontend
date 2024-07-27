import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Location} from "@angular/common";
import {ProfileResponse} from "../../../shared/model/account.model";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}];
  workingPlaces: any[] = [{value: "1460 Đ. Võ Văn Kiệt, Phường 1, Quận 6, Thành phố Hồ Chí Minh"}, {value: "Đường Nguyễn Văn Cừ, Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng"}, {value: "273 Nguyễn Tri Phương, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000"}];
  accountProfile?: ProfileResponse;
  changePasswordVisible: boolean = false;

  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private accountService: AccountService,
              private ctr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.accountService.getAccountProfile().subscribe(profileResponse => {
      this.accountProfile = profileResponse?.data;
    })
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

  handleClickChangePassword() {
    this.changePasswordVisible = true;
    this.ctr.detectChanges();
  }

  handleChangePasswordClose(evt: any) {
    this.changePasswordVisible = evt;
  }
}
