import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobType} from "../../../../shared/model/job-type.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {Observable, Subject} from "rxjs";
import {MessageService} from "primeng/api";
import {Department} from "../../../../shared/model/department.model";

@Component({
  selector: 'app-job-type-configuration',
  templateUrl: './job-type-configuration.component.html',
  styleUrls: ['./job-type-configuration.component.scss']
})
export class JobTypeConfigurationComponent {
  jobTypeForm: FormGroup;
  jobTypes: JobType[] = [];
  displayJobTypes: JobType[] = [];
  loading: boolean = true;

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.jobTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.jobTypes$.subscribe(jobTypes => {
      if (jobTypes) {
        this.jobTypes = jobTypes;
        this.displayJobTypes = [...jobTypes];
      } else {
        this.jobTypes = [];
        this.displayJobTypes = [];
      }
      this.loading = false
    });

  }

  onSubmit() {
    if (this.jobTypeForm.valid) {
      const jobType: JobType = this.jobTypeForm.value;
      if (this.isExistJobType(jobType.name)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất Bại',
          detail: 'Loại Công Việc Đã Tồn Tại',
        });
        return;
      }
      this.configurationService.createJobType(jobType).subscribe(
        (response: any) => {
          this.configurationService.loadJobType();
          this.jobTypeForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Tạo loại công việc thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Tạo loại công việc thất bại',
          });
        }
      );
    }
  }

  filterTable(event: Event) {

    let filterWord = (event.target as HTMLInputElement).value;
    if (filterWord.length > 0) {
      this.displayJobTypes = this.displayJobTypes
        .filter(jb => jb.name.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.name));
    } else {
      this.displayJobTypes = [...this.jobTypes];
    }
  }

  isExistJobType(newName: string) {
    return this.jobTypes.filter(jb => jb.name.toLowerCase() == newName.toLowerCase()).length > 0;
  }

  deleteJobType(jobType: JobType) {
    if (jobType && jobType.id) {
      this.configurationService.deleteJobType(jobType.id).subscribe(
        (response: any) => {
          this.configurationService.loadJobType();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Xóa loại công việc thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Xóa loại công việc thất bại',
          });
        }
      );
    }
  }
}
