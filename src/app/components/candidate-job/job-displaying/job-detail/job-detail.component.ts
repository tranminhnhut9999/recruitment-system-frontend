import {Component, OnInit} from '@angular/core';
import {Job} from "../../../../shared/model/job";
import {JobService} from "../../../../shared/services/job.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  job!: Job;
  jobId: string = "";
  formVisible: boolean = false;

  constructor(private jobService: JobService, private route: ActivatedRoute) {
    this.jobId = route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
    this.jobService.getHiringDetailJob(this.jobId).subscribe(response => {
      this.job = response.data;
    })
  }

  handleClickApply() {
    this.formVisible = true;
  }
  handleCloseApplyForm(){
    this.formVisible = false;
  }
}
