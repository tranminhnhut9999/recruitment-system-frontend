import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobService} from "../../../../shared/services/job.service";
import {Job} from "../../../../shared/model/job";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}];
  hiringJobs: Job[] = [];

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.jobService.getHiringJobs().subscribe(response => {
      this.hiringJobs = response.data;
    })
  }
}
