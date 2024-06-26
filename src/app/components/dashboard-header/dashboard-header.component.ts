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
                label: 'Ứng viên',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Theo vị trí công việc',
                    },
                    {
                        label: 'Tất cả đơn xin việc',
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
                    },
                    {separator: true},
                    {
                        label: 'Phòng ban',
                    },
                    {
                        label: 'Các loại kĩ năng'
                    },
                    {separator: true},
                    {
                        label: 'Nhân sự'
                    }
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
