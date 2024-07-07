import {Component, OnInit} from '@angular/core';
import {CandidateApplication} from "../../../shared/model/candidate-application.model";
import {JobService} from "../../../shared/services/job.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {Dictionary} from "../../../shared/model/dictionary";


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  applications: CandidateApplication[] = [];
  jobId: any;
  classifiedApplications: Dictionary<CandidateApplication[]> = {};

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.jobId = activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    let loginEmail = this.authService.getLoginEmail();
    this.jobService.getCandidateApplication({jobId: this.jobId, interviewEmail: loginEmail})
      .subscribe(response => {
        this.applications = response?.data;
        this.classifyApplication(this.applications);
      });
  }

  classifyApplication(applications: CandidateApplication[]) {
    for (let application of applications) {
      let status = application.status;
      let applycationByStatus = this.classifiedApplications[status];
      if (applycationByStatus) {
        this.classifiedApplications[status].push(application);
      } else {
        this.classifiedApplications[status] = [application];
      }
    }
  }
  getKeys(dictionary: Dictionary<CandidateApplication[]>): string[] {
    return Object.keys(dictionary);
  }
}
