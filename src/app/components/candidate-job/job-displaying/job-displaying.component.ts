import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-job-displaying',
    templateUrl: './job-displaying.component.html',
    styleUrls: ['./job-displaying.component.scss']
})
export class JobDisplayingComponent {
    departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}]
}
