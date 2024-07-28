import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ProfileResponse, RoleResponse} from "../../../../shared/model/account.model";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {AccountService} from "../../../../shared/services/account.service";
import {WorkingAddress} from "../../../../shared/model/working-address.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../shared/services/role.service";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
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
  _profile?: ProfileResponse;
  dob?: Date;
  roles: RoleResponse[] = [];


  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private accountService: AccountService,
              private ctr: ChangeDetectorRef,
              private fb: FormBuilder,
              private configurationService: ConfigurationService,
              private messageService: MessageService,
              private roleService: RoleService) {
    this.profileForm = this.fb.group({
      email: [{value: '', disabled: true}, Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      perPhone: [{value: '', disabled: true}, [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      perAddress1: [{value: '', disabled: true}, Validators.required],
      perAddress2: [{value: '', disabled: true}],
      citizenID: ['', Validators.required],
      emergencyContactName: [{value: '', disabled: true}, Validators.required],
      emergencyPhoneNumber: [{
        value: '',
        disabled: true
      }, [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      avatarImg: [{value: null, disabled: true}],
      workingPlace: [''],
      gender: ['', Validators.required],
      dob: [],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadConfigurationData();
  }

  loadConfigurationData() {
    this.configurationService.departments$.subscribe(departments => this.departments = departments);
    this.configurationService.workingAddresses$.subscribe(workingAddress => this.workingPlaces = workingAddress);
    this.roleService.roles$.subscribe(roles => this.roles = roles);
  }

  @Input()
  set profile(value: ProfileResponse) {
    this._profile = value;
    this.handleDataChange();
    this.setValueToForm(this._profile);
  }

  handleDataChange() {
    this.dob = new Date(this._profile?.dob);
    this.findWorkingAddress(this._profile?.workingPlace);
    this.findGender(this._profile?.genderCode);
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

  findWorkingAddress(address?: string) {
    if (!address) return;
    return this.workingPlaces.find(workingAddress => workingAddress.address === address);
  }

  findGender(gender?: string) {
    if (!gender) return;
    return this.genderOptions.find(genderOption => genderOption.code === gender);
  }

  findRole(roleCode?: string) {
    if (!roleCode) return;
    return this.roles.find(role => role.code === roleCode);
  }

  handleClickResetPassword() {
    let confirmation: Confirmation = {
      header: "Xác nhận",
      message: "Bạn có muốn reset mật khẩu của nhân viên này ?",
      acceptLabel: "Reset",
      rejectLabel: "Hủy",
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary",
      accept: () => {
        this.accountService.resetPassword(this._profile?.id as number).subscribe({
          next: value => {
            this.messageService.add({
              severity: 'success',
              summary: "Thành công",
              detail: "Reset mật khẩu thành công"
            });
          },
          error: err => {
            this.messageService.add({
              severity: 'error',
              summary: "Thất bại",
              detail: "Reset mật khẩu thất bại"
            });
          }
        })
      }
    };
    this.confirmService.confirm(confirmation);
  }

  setValueToForm(profile: ProfileResponse) {
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
    this.profileForm.get('role')?.setValue(profile?.role?.code);


    this.profileForm.get('workingPlace')?.setValue(profile.workingPlace);
    this.profileForm.get('gender')?.setValue(profile.genderCode);
  }

  getFullName(firstName?: string, lastName?: string) {
    return (firstName || "") == "" ? (lastName || "") : firstName +" " + (lastName || "");
  }

  onClickUpdate() {
    const formData = new FormData();
    Object.keys(this.profileForm.controls).forEach(key => {
      formData.append(key, this.profileForm.get(key)?.value);
    });


    this.accountService.updateProfile(this._profile?.id, this.buildFormData(this.profileForm)).subscribe({
      next: value => {
        this.refreshData();
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
    let citizenID = formGroup.get('citizenID')?.value;
    let workingPlace = formGroup.get('workingPlace')?.value;
    let role = formGroup.get('role')?.value;
    let gender = formGroup.get('gender')?.value;
    let dob = formGroup.get('dob')?.value;
    let firstname = formGroup.get('firstname')?.value
    let lastname = formGroup.get('lastname')?.value

    let formData: FormData = new FormData();
    formData.append('citizenID', citizenID || "");
    formData.append('workingPlace', workingPlace || "");
    formData.append('roleCode', role || "");
    formData.append('gender', gender || "");
    formData.append('dob', dob?.toISOString() || "");
    formData.append('firstname', firstname || "");
    formData.append('lastname', lastname || "");
    return formData;
  }
  refreshData(){
    this.accountService.loadAccount();
  }
}
