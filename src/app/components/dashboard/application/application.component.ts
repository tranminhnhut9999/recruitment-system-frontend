import {Component, OnInit} from '@angular/core';
import {CandidateApplication} from "../../../shared/model/candidate-application.model";
import {JobService} from "../../../shared/services/job.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {Dictionary} from "../../../shared/model/dictionary";
import {StatusLogResponse} from "../../../shared/model/status-log.model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
// Array of mock candidate applications
  applications: CandidateApplication[] = [];
  jobId: any;
  classifiedApplications: Dictionary<CandidateApplication[]> = {};

  constructor(private jobService: JobService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private http: HttpClient) {
    this.jobId = activatedRoute.snapshot.paramMap.get("jobId");

  }

  ngOnInit(): void {
    let loginEmail = this.authService.getLoginEmail();
    this.jobService.getCandidateApplication({jobId: this.jobId, interviewEmail: loginEmail})
      .subscribe(response => {
        this.applications = response?.data;
        this.classifyApplication(this.applications);
      });
  }

  classifyApplication(applications: CandidateApplication[] = []) {
    for (let application of applications) {
      let status = application.status;
      let applycationsByStatus = this.classifiedApplications[status];
      if (applycationsByStatus) {
        if (applycationsByStatus) {
          this.classifiedApplications[status].push(application);
        }
      } else {
        this.classifiedApplications[status] = [application];
      }
    }
  }
}
