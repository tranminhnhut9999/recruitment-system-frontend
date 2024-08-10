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
  departments: any[] = [];
  hiringJobs: Job[] = [];
  displayJobs: Job[] = [];

  constructor(private jobService: JobService) {
  }

  ngOnInit() {

    this.jobService.searchJob$.subscribe(searchCondition => {
      this.jobService.getHiringJobs(searchCondition).subscribe(async response => {
        this.hiringJobs = response.data;
        this.displayJobs = this.hiringJobs;
      });
    });

    // this.jobService.getHiringJobs("").subscribe(async response => {
    //   this.hiringJobs = response.data;
    //   this.displayJobs = this.hiringJobs;
    // });
  }
}
