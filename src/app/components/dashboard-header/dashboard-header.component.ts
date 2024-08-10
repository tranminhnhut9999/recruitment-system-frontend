import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {ROLE} from "../../shared/constants/role-config";

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
        items: [
          {
            label: 'Các công việc',
            routerLink: 'recruitment',
            visible: this.authService.userHasRoles([ROLE.HR_MANAGER, ROLE.HR_STAFF])
          },
          {
            label: 'Nhân viên',
            routerLink: 'staff-management',
            visible: this.authService.userHasRoles([ROLE.ADMIN, ROLE.HR_MANAGER])
          }
        ]
      },
      {
        label: 'Cấu hình',
        visible: this.authService.userHasRoles([ROLE.ADMIN]),
        items: [
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
