import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JobType} from "../../../../shared/model/job-type.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {debounceTime, distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-job-type-configuration',
  templateUrl: './job-type-configuration.component.html',
  styleUrls: ['./job-type-configuration.component.scss']
})
export class JobTypeConfigurationComponent {
  jobTypeForm: FormGroup;
  jobTypes: JobType[] = [];
  filteredJobTypes: JobType[] = [];
  loading: boolean = true;
  searchControl: FormControl = new FormControl('');

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.jobTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.jobTypes$.subscribe(jobTypes => {
      if (jobTypes) {
        this.jobTypes = jobTypes;
        this.filteredJobTypes = this.jobTypes;
      } else {
        this.jobTypes = [];
        this.filteredJobTypes = [];
      }
      this.loading = false
    });
    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // 1-second delay
      distinctUntilChanged(),
      map((searchTerm) => this.filterJobTypes(searchTerm))
    ).subscribe(filtered => {
      this.filteredJobTypes = filtered;
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

  filterJobTypes(searchTerm: string): JobType[] {
    if (!searchTerm) {
      return this.jobTypes;
    }

    searchTerm = searchTerm.toLowerCase();

    return this.jobTypes.filter(jobType => {
      const jobTypeName = this.removeDiacritics(jobType.name).toLowerCase();

      return jobTypeName.includes(searchTerm);
    });
  }

  // Helper function to remove diacritics for Vietnamese search
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
