import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {ProfileResponse} from "../../../shared/model/profile.model";
import {Job} from "../../../shared/model/job";
import {JobService} from "../../../shared/services/job.service";
import {DateValidator} from "../../../shared/validators/DateValidator";
import {StringValidator} from "../../../shared/validators/StringValidator";
import {Subscription} from "rxjs";
import {PerformJobRequest} from "../../../shared/model/perform-job-request";
import Quill from "quill";
import {ConfigurationService} from "../../../shared/services/configuration.service";
import {Department} from "../../../shared/model/department.model";
import {WorkingAddress} from "../../../shared/model/working-address.model";
import {JobType} from "../../../shared/model/job-type.model";
import {Skill} from "../../../shared/model/skill.model";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent implements OnInit, OnDestroy, AfterViewInit {
  quickStartStatus: boolean = false;
  value1: number = 1500;
  @ViewChild('editorText', {static: false}) editorText!: any;
  formType: "ADDING" | "UPDATING" = "ADDING";
  job?: Job;
  jobForm: FormGroup | undefined;
  recruiters: ProfileResponse[] = [];
  onlyReadStartDate: boolean = false;
  jobId: string = "";
  subscription!: Subscription;
  stateOptions: any[] = [{label: 'Tuyển', value: true}, {label: "Đóng", value: false}];
  quill!: Quill;
  departments: Department[] = []
  workingPlaces: WorkingAddress[] = []
  jobTypes: JobType[] = []
  skillKeywords: Skill[] = [];

  constructor(private location: Location, private confirmService: ConfirmationService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private jobService: JobService,
              private messageService: MessageService,
              private configurationService: ConfigurationService,
              private accountService: AccountService) {
    let path = this.activatedRoute.snapshot.url[0].path;
    if (path === "job-posting") {
      this.formType = "ADDING";
    } else {
      this.formType = "UPDATING";
      this.jobId = this.activatedRoute.snapshot.paramMap.get("id") as string;
      this.getInitData();
    }
  }

  ngOnInit() {
    this.jobForm = this.createFormControls();
    this.loadConfigurationData();
    this.loadHrStaffs();
  }

  private loadHrStaffs() {
    this.subscription = this.authService.getHrStaff().subscribe(hrStaffs => {
      if (hrStaffs.data) {
        this.recruiters = [...hrStaffs.data];
      }
    });
  }

  handleClickingBack() {
    this.confirmService.confirm({
      message: 'Trở về sẽ mất dữ liệu chưa lưu trữ, bạn có muốn trở về ? ',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Xác nhận",
      rejectLabel: "Hủy",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.location.back();
      }
    });
  }

  handleSubmit() {
    if (this.formType == "ADDING") {
      this.handleCreateJob();
    } else {
      this.handleUpdateJob();
    }
  }

  ngAfterViewInit() {
    if (this.formType == "UPDATING") {
      this.getInitData();
    }
  }

  getInitData() {
    this.subscription = this.jobService.getJobByID(Number.parseFloat(this.jobId)).subscribe(response => {
      this.job = response.data;
      // @ts-ignore
      if (this.jobForm) {
        // Set init data for input field
        this.jobForm.controls['title'].setValue(this.job.title);
        this.jobForm.controls['description'].setValue(this.job.description);
        this.setDescriptionContent(this.job.description);
        this.jobForm.controls['endDate'].setValue(new Date(this.job.endDate));
        this.jobForm.controls['startDate'].setValue(new Date(this.job.startDate));
        this.jobForm.controls['requiredExperience'].setValue(this.job.requiredExperience);
        this.jobForm.controls['targetNumber'].setValue(this.job.targetNumber);
        this.jobForm.controls['status'].setValue(this.job.status);
        this.jobForm.controls['salaryRangeFrom'].setValue(this.job.salaryRangeFrom);
        this.jobForm.controls['salaryRangeTo'].setValue(this.job.salaryRangeTo);
        this.jobForm.controls['department'].setValue(this.job.department);
        this.jobForm.controls['workingPlace'].setValue(this.job.workingPlace);
        this.jobForm.controls['jobType'].setValue(this.job.jobType);
        this.jobForm.controls['keywords'].setValue([...this.job.keywords]);
        this.jobForm.controls['recruiters'].setValue([...this.job.recruiters]);
      }
    })
  }

  onChangeDescription(ev: any) {
    console.log(ev);
  }

  createFormControls() {
    return this.fb.group({
        title: ['', [Validators.required, StringValidator.nonEmptyString]],
        department: ['', Validators.required],
        description: [Validators.required],
        targetNumber: [0, [Validators.required, Validators.min(1)]],
        salaryRangeFrom: [0, [Validators.required, Validators.min(0)]],
        salaryRangeTo: [0, [Validators.required, Validators.min(0)]],
        keywords: [[], Validators.required],
        endDate: [Validators.required, DateValidator.endDateAfterStartDate],
        startDate: [Validators.required, DateValidator.startDateNotPast],
        status: [false, Validators.required],
        requiredExperience: [0, [Validators.required, Validators.min(0)]],
        recruiters: [[], Validators.required],
        jobType: ['', Validators.required],
        workingPlace: ['', Validators.required],
      },
      {
        validators: DateValidator.endDateAfterStartDate
      });
  }

  handleCreateJob() {
    if (this.jobForm?.valid) {
      let createJobRequest: PerformJobRequest = this.convertFormToJSON();
      this.jobService.createJob(createJobRequest).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Tạo công việc thành công',
            life: 1000,
          });
          this.jobForm?.reset();
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Tạo công việc thất bại',
            life: 1000,
          })
        }
      });
    } else {
      console.log(this.convertFormToJSON())
    }
  }

  handleUpdateJob() {
    let startDateFormControl = this.jobForm?.get("startDate");
    let isValidStartDate: boolean;

    if (startDateFormControl?.dirty) {
      isValidStartDate = startDateFormControl.valid;
    } else {
      isValidStartDate = true;
    }


    let isFormValidState = isValidStartDate || this.jobForm?.valid;
    if (isFormValidState) {
      let request: PerformJobRequest = this.convertFormToJSON();
      console.log("HANDLE UPDATE JOB:", request)
      this.jobService.update(Number.parseFloat(this.jobId), request).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Cập nhật công việc thành công',
            life: 1000,
          });
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Cập nhật công việc thất bại',
            life: 1000,
          })
        }
      });
    } else {
      this.messageService.add(
        {
          severity: "error",
          summary: 'Thất bại',
          detail: 'Cập nhật công việc thất bại',
        }
      );
      console.log(this.jobForm)
    }
  }

  convertFormToJSON(): any {
    if (this.jobForm == undefined) {
      return;
    }
    const formValue = this.jobForm.value;
    // Convert the form values to JSON
    return JSON.stringify(formValue);
  }

  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setDescriptionContent(description: string) {
    if (this.editorText) {
      let quill = this.editorText.quill as Quill;
      quill.clipboard.dangerouslyPasteHTML(0, description);
    }
  }

  handleSelectStartDate() {
    this.quickStartStatus = false;
  }

  handleChangeStatus() {
    this.quickStartStatus = false;
  }

  loadConfigurationData() {
    this.configurationService.departments$.subscribe(departments => this.departments = departments);
    this.configurationService.jobTypes$.subscribe(jobTypes => this.jobTypes = jobTypes);
    this.configurationService.workingAddresses$.subscribe(workingAddress => this.workingPlaces = workingAddress);
    this.configurationService.skill$.subscribe(skills => this.skillKeywords = skills);
  }
}
