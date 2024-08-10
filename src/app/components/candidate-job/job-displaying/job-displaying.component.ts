import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../shared/services/job.service";
import {ConfigurationService} from "../../../shared/services/configuration.service";
import {Observable} from "rxjs";
import {Department} from "../../../shared/model/department.model";

@Component({
  selector: 'app-job-displaying',
  templateUrl: './job-displaying.component.html',
  styleUrls: ['./job-displaying.component.scss']
})
export class JobDisplayingComponent {
  freeTxt: string = "";
  departments: any[] = [];
  selectedDepartment?: Department;

  constructor(private jobService: JobService, private configurationService: ConfigurationService) {
    this.configurationService.departments$.subscribe(departments => {
      this.departments = departments;
    });
  }

  handleSearchByText() {
    // Will apply for: tag, job name
    // if (!this.freeTxt || "" === this.freeTxt.trim()) {
    //   return;
    // }
    this.jobService.searchJob$.next({
      query: this.freeTxt,
      department: this.selectedDepartment ? this.selectedDepartment?.name : ""
    });
  }
}
