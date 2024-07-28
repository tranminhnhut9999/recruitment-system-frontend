import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ProfileResponse} from "../../../shared/model/account.model";
import {AccountService} from "../../../shared/services/account.service";
import {WorkingAddress} from "../../../shared/model/working-address.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {firstValueFrom, Subject} from "rxjs";
import {Department} from "../../../shared/model/department.model";
import {ConfigurationService} from "../../../shared/services/configuration.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  accountProfile?: ProfileResponse;
  changePasswordVisible: boolean = false;
  genderOptions: { label: string, code: string }[] =
    [
      {label: 'Nam', code: 'MALE'},
      {
        label: 'Nữ',
        code: 'FEMALE'
      }, {label: 'Khác', code: 'OTHER'}];
  workingPlaces: WorkingAddress[] = [];
  profileForm: FormGroup;
  departments: Department[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile?: File;

  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private accountService: AccountService,
              private ctr: ChangeDetectorRef,
              private fb: FormBuilder,
              private configurationService: ConfigurationService,
              private messageService: MessageService) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      compPhone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      perPhone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      perAddress1: ['', Validators.required],
      perAddress2: [''],
      citizenID: ['', Validators.required],
      emergencyContactName: ['', Validators.required],
      emergencyPhoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      avatarImg: [null],
      workingPlace: [''],
      eduLevel: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [],
    });

  }

  ngOnInit() {
    this.accountService.getAccountProfile().subscribe(profileResponse => {
      this.accountProfile = profileResponse?.data;
      this.setValueToForm(this.accountProfile);
    });
    this.loadConfigurationData();
  }

  loadConfigurationData() {
    this.configurationService.departments$.subscribe(departments => this.departments = departments);
    this.configurationService.workingAddresses$.subscribe(workingAddress => this.workingPlaces = workingAddress);
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

  handleClickChangePassword() {
    this.changePasswordVisible = true;
    this.ctr.detectChanges();
  }

  handleChangePasswordClose(evt: any) {
    this.changePasswordVisible = evt;
  }


  setValueToForm(profile: ProfileResponse) {
    console.log("SET VALUE TO FORM")
    this.profileForm.get('email')?.setValue(profile.email);
    this.profileForm.get('firstname')?.setValue(profile.firstname);
    this.profileForm.get('lastname')?.setValue(profile.lastname);
    this.profileForm.get('compPhone')?.setValue(profile.compPhone);
    this.profileForm.get('perPhone')?.setValue(profile.perPhone);
    this.profileForm.get('perAddress1')?.setValue(profile.perAddress1);
    this.profileForm.get('perAddress2')?.setValue(profile.perAddress2);
    this.profileForm.get('citizenID')?.setValue(profile.citizenID);
    this.profileForm.get('emergencyContactName')?.setValue(profile.emergencyContactName);
    this.profileForm.get('emergencyPhoneNumber')?.setValue(profile.emergencyPhoneNumber);
    this.profileForm.get('avatarImg')?.setValue(profile.avatarImg);
    this.profileForm.get('dob')?.setValue(new Date(profile.dob));


    this.profileForm.get('workingPlace')?.setValue(this.findWorkingAddress(profile.workingPlace));
    this.profileForm.get('gender')?.setValue(this.findGender(profile.genderCode));
    console.log("Working Place:", this.findWorkingAddress(profile.workingPlace));
    this.imagePreview = profile.avatarImg;
  }

  findWorkingAddress(address?: string) {
    if (!address) return;
    return this.workingPlaces.find(workingAddress => workingAddress.address === address);
  }

  findGender(gender?: string) {
    if (!gender) return;
    return this.genderOptions.find(genderOption => genderOption.code === gender);
  }

  getFullName(firstName?: string, lastName?: string) {
    return (firstName || "") == "" ? (lastName || "") : +" " + (lastName || "");
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.selectedFile = file;
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openFileDialog(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onClickUpdate() {
    const formData = new FormData();
    Object.keys(this.profileForm.controls).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value);
    });


    this.accountService.updateProfile(this.accountProfile?.id, this.buildFormData(this.profileForm)).subscribe({
      next: value => {
        this.messageService.add({
          severity: "success",
          summary: "Thành công",
          detail: "Cập nhật hồ sơ thành công"
        });
      },
      error: err => {
        this.messageService.add({
          severity: "error",
          summary: "Thất bại",
          detail: "Cập nhật hồ sơ thất bại"
        })
      }
    });
  }

  buildFormData(formGroup: FormGroup) {
    let perAddress1 = formGroup.get('perAddress1')?.value;
    let perAddress2 = formGroup.get('perAddress2')?.value;
    let emergencyContactName = formGroup.get('emergencyContactName')?.value;
    let emergencyPhoneNumber = formGroup.get('emergencyPhoneNumber')?.value;
    let perPhone = formGroup.get('perPhone')?.value;
    let avatarImg = formGroup.get('avatarImg')?.value;

    let formData: FormData = new FormData();
    formData.append('perAddress1', perAddress1 || "");
    formData.append('perAddress2', perAddress2 || "");
    formData.append('emergencyContactName', emergencyContactName || "");
    formData.append('emergencyPhoneNumber', emergencyPhoneNumber || "");
    formData.append('perPhone', perPhone || "");
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    return formData;
  }
}
