import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent implements OnInit {
    jobInformationFormGroup: FormGroup = new FormGroup<any>({
        jobTitle: new FormControl("", Validators.required),
        jobDescription: new FormControl("", Validators.required),
    });
    constructor(private location: Location, private confirmService: ConfirmationService)
    {}
    ngOnInit() {
        this.jobInformationFormGroup.get('jobTitle');
    }

    departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}]
    workingPlaces: any[] = [{value: "1460 Đ. Võ Văn Kiệt, Phường 1, Quận 6, Thành phố Hồ Chí Minh"}, {value: "Đường Nguyễn Văn Cừ, Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng"}, {value: "273 Nguyễn Tri Phương, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000"}]
    jobTypes: any[] = [{value: "Thời vụ"}, {value: "Bán thời gian"}, {value: "Toàn thời gian"}]
    interviewers: any[] = [{value: "Phạm Khánh Toàn"}, {value: "Thư Nguyễn"}, {value: "Dương Đình Trọng"}, {value: "Tiến Cường"}]
    recruiters: any[] = [{value: "Phạm Khánh Toàn"}, {value: "Thư Nguyễn"}, {value: "Dương Đình Trọng"}, {value: "Tiến Cường"}]

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
