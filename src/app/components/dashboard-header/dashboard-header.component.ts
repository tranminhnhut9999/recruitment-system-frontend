import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  headerMenuItems: MenuItem[] | undefined;
  profileMenuItems: MenuItem[] | undefined;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.headerMenuItems = [
      {
        label: 'Quản lý',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Các công việc',
            routerLink: 'recruitment'
          },
          {
            label: 'Nhân viên',
            routerLink: 'staff-management'
          }
        ]
      },
      {
        label: 'Báo cáo',
        icon: 'pi pi-star',
        items: [
          {
            label: 'Phân tích tuyển dụng',
          },
          {
            label: 'Phân tích nguồn',
          },
          {
            label: 'Phân tích thời gian trong giai đoạn',
          },
          {
            label: 'Hiệu suất của bộ phận',
          }
        ]
      },
      {
        label: 'Cấu hình',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Cài đặt',
          },
          {separator: true},
          {
            label: 'Loại việc làm',
            routerLink: 'job-types'
          },
          {separator: true},
          {
            label: 'Phòng ban',
            routerLink: 'departments'
          },
          {
            label: 'Các loại kĩ năng',
            routerLink: 'skills'
          },
          {
            label: 'Địa chỉ làm việc',
            routerLink: 'working-address'
          },
        ]
      }
    ];
    this.profileMenuItems = [
      {label: "Thông tin cá nhân", routerLink: "account"},
      {
        label: "Đăng xuất",
        command: () => {
          this.authService.logout();
          this.router.navigateByUrl("/login");
        }
      }
    ]
  }
}
