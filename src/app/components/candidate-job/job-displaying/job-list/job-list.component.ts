import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobService} from "../../../../shared/services/job.service";
import {Job} from "../../../../shared/model/job";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  departments: any[] = [{value: "Bộ phận IT"}, {value: "Bộ phận kế toán"}, {value: "Bộ phận bảo vệ"}, {value: "Bộ phận bán hàng"}];
  hiringJobs: Job[] = [];
  displayJobs: Job[] = [];

  constructor(private jobService: JobService) {
  }

  ngOnInit() {

    this.jobService.searchJob$.subscribe(searchCondition => {
      if (!searchCondition ||
        searchCondition?.freeTxt?.trim().length == 0 ||
        searchCondition?.department?.trim().length == 0) {
        this.displayJobs = this.hiringJobs;
      } else {
        this.displayJobs = this.hiringJobs.filter(job => {
          let freeTxtSearch: boolean = true;
          let departmentFilter: boolean = true;
          if (searchCondition?.freeTxt && searchCondition?.freeTxt?.trim().length > 0) {
            freeTxtSearch = job.keywords.indexOf(searchCondition.freeTxt) >= 0
              || job.description.indexOf(searchCondition.freeTxt) >= 0
              || job.title.indexOf(searchCondition.freeTxt) >= 0;
          }
          if (searchCondition?.department || searchCondition.department != '') {
            departmentFilter = job.department === searchCondition.department;
          }
          return freeTxtSearch && departmentFilter;
        });
      }
    });

    this.jobService.getHiringJobs().subscribe(async response => {
      this.hiringJobs = response.data;
      this.displayJobs = this.hiringJobs;
    });
  }
}
