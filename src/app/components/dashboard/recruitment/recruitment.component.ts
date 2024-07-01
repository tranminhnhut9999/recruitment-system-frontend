import {Component, OnInit} from '@angular/core';
import {Job} from "../../../shared/model/job";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  selectedJobOverview: Job[] = [];
  jobOverviews: Job[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.replaceAll('"', '')}`);

    this.http.get("http://localhost:8082/api/jobs", {headers: headers}).subscribe((response: any) => {
      let jobList = response.data;
      this.extractJobOverviews(jobList);
    });
  }

  extractJobOverviews(jobListResponse: any[]) {
    this.jobOverviews = [...jobListResponse];
  }


}
