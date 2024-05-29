import {Component} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Location} from "@angular/common";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent {
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
  constructor(private confirmService: ConfirmationService, private location: Location) {
  }
  handleClickingBack() {
    this.confirmService.confirm({
      message: 'Trở về sẽ mất dữ liệu chưa lưu trữ, bạn có muốn trở về ? ',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel: "Xác nhận",
      rejectLabel: "Hủy",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.location.back();
      }
    });
  }
}
