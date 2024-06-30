import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JobResponse} from "../../../../../shared/model/job.response";

@Component({
  selector: 'app-apply-job-form',
  templateUrl: './apply-job-form.component.html',
  styleUrls: ['./apply-job-form.component.scss']
})
export class ApplyJobFormComponent implements OnInit {
  applyForm!: FormGroup;
  visible: boolean = true;
  job!: JobResponse;
  currentDate: Date = new Date();

  constructor(private fb: FormBuilder) {
  }

  @Input({required: true})
  set appliedJob(appliedJob: JobResponse) {
    this.job = appliedJob;
    this.createApplyForm(this.job);
  }

  ngOnInit(): void {
    this.createApplyForm();
  }

  private createApplyForm(job?: JobResponse) {
    this.applyForm = this.fb.group({
      "email": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "phoneNumber": new FormControl('', Validators.required),
      "dateOfBirth": new FormControl('', Validators.required),
      "address": new FormControl('', Validators.required),
      "jobId": new FormControl(job?.id, Validators.required),
      "cvFile": new FormControl(Validators.required),
    });
  }

  showDialog() {
    this.visible = true;
  }

  handleSubmit() {
    alert("Submit Thành Công")
  }

  protected readonly Date = Date;
}
