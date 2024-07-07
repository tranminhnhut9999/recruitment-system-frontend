import {Component, OnInit} from '@angular/core';
import {Job} from "../../../shared/model/job";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JobService} from "../../../shared/services/job.service";

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  selectedJobOverview: Job[] = [];
  jobOverviews: Job[] = [];

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.replaceAll('"', '')}`);

    this.jobService.getAllJobs().subscribe((response: any) => {
      let jobList = response.data;
      this.extractJobOverviews(jobList);
    });
  }

  extractJobOverviews(jobListResponse: any[]) {
    this.jobOverviews = [...jobListResponse];
  }
}
