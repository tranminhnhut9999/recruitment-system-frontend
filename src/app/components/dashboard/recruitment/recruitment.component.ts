import {Component, OnInit} from '@angular/core';
import {Job} from "../../../shared/model/job";
import {HttpHeaders} from "@angular/common/http";
import {JobService} from "../../../shared/services/job.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ROLE} from "../../../shared/constants/role-config";
import {ProfileResponse} from "../../../shared/model/profile.model";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  selectedJobOverview: Job[] = [];
  jobOverviews: Job[] = [];
  filterJobOverViews: Job[] = [];
  isHrManager: boolean = false;
  searchControl = new FormControl('');

  constructor(private jobService: JobService, private authService: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.replaceAll('"', '')}`);

    this.jobService.getAllJobs().subscribe((response: any) => {
      let jobList = response.data;
      this.extractJobOverviews(jobList);
      this.filterJobOverViews = this.jobOverviews;
    });
    this.isHrManager = this.authService.userHasRoles([ROLE.HR_MANAGER]);

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // 1-second delay
      distinctUntilChanged(),
      map((searchTerm) => this.filterJobs(searchTerm ? searchTerm : ""))
    ).subscribe(filtered => {
      console.log("FILTER JOB")
      this.filterJobOverViews = filtered;
    });
  }

  extractJobOverviews(jobListResponse: any[]) {
    this.jobOverviews = [...jobListResponse];
  }


  filterJobs(searchTerm: string): Job[] {
    if (!searchTerm || searchTerm.length == 0) {
      return this.jobOverviews;
    }

    searchTerm = searchTerm.toLowerCase();

    return this.jobOverviews.filter(job => {
      const description = this.removeDiacritics(job.description).toLowerCase();
      const title = this.removeDiacritics(job.title).toLowerCase();
      // const email = this.removeDiacritics(job.).toLowerCase();

      return description.includes(searchTerm) || title.includes(searchTerm);
    });
  }

  // Helper function to remove diacritics for Vietnamese search
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
