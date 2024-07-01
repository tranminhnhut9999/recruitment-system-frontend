import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Job} from "../../../../../shared/model/job";
import {JobService} from "../../../../../shared/services/job.service";
import {ApiResponse} from "../../../../../shared/model/api.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-apply-job-form',
  templateUrl: './apply-job-form.component.html',
  styleUrls: ['./apply-job-form.component.scss']
})
export class ApplyJobFormComponent implements OnInit {
  applyForm!: FormGroup;
  @Input({required: true}) visible!: boolean;
  @Output() onCloseForm = new EventEmitter<boolean>();
  job!: Job;
  fileToUpload: File | null = null;


  constructor(private fb: FormBuilder, private jobService: JobService, private messageService: MessageService) {
  }

  @Input({required: true})
  set appliedJob(appliedJob: Job) {
    this.job = appliedJob;
    this.createApplyForm(this.job);
  }

  ngOnInit(): void {
    this.createApplyForm();
  }

  private createApplyForm(job?: Job) {
    this.applyForm = this.fb.group({
      "email": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "phoneNumber": new FormControl('', Validators.required),
      "dateOfBirth": new FormControl('', Validators.required),
      "address": new FormControl('', Validators.required),
      "jobId": new FormControl(job?.id, Validators.required),
      "cvFile": new FormControl(null, Validators.required),
    });
  }

  showDialog() {
    this.visible = true;
  }

  handleSubmit() {
    const formData = this.createFormData();

    this.jobService.applyToJob(formData).subscribe({
      next: (response: ApiResponse<Job>) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Nộp đơn thành công, vui lòng kiểm tra email'
        });
      },
      error: (response: ApiResponse<Job>) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: 'Nộp đơn thất bại, vui lòng thử lại'
        });
      },
      complete: () => {
        this.visible = false;
      }
    });
    this.visible = false;
  }

  private createFormData() {
    const formData = new FormData();
    formData.append('name', this.applyForm.get('name')?.value);
    formData.append('email', this.applyForm.get('email')?.value);
    formData.append('phoneNumber', this.applyForm.get('phoneNumber')?.value);
    formData.append('dateOfBirth',this.convertToUTC(this.applyForm.get('dateOfBirth')?.value as Date));
    formData.append('address', this.applyForm.get('address')?.value);
    formData.append('jobId', this.job.id as any);
    if (this.fileToUpload) {
      formData.append('cvFile', this.fileToUpload, this.fileToUpload.name);
    }
    return formData;
  }

  onFileUpload(event: any) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.applyForm.patchValue({
        cvFile: this.fileToUpload
      });
    }
  }

  handleOnHideDialog() {
    this.onCloseForm.emit(false);
  }
  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }

  protected readonly Date = Date;
}
