import {Component, Input} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {Location} from "@angular/common";
import {ProfileResponse} from "../../../../shared/model/account.model";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent {
  selectedDepartment?: Department;
  selectedGender?: { label: string, code: string };
  selectedWorkingPlace: any;
  departments: Department[] = [];
  workingPlaces: any[] = [{value: "1460 Đ. Võ Văn Kiệt, Phường 1, Quận 6, Thành phố Hồ Chí Minh"}, {value: "Đường Nguyễn Văn Cừ, Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng"}, {value: "273 Nguyễn Tri Phương, Hòa Thuận Đông, Hải Châu, Đà Nẵng 550000"}];
  _profile?: ProfileResponse;
  dob?: Date;
  genderOptions: { label: string, code: string }[] =
    [
      {label: 'Nam', code: 'MALE'},
      {
        label: 'Nữ',
        code: 'FEMALE'
      }, {label: 'Khác', code: 'OTHER'}]

  constructor(private confirmService: ConfirmationService,
              private location: Location,
              private configurationService: ConfigurationService) {
  }

  @Input()
  set profile(value: ProfileResponse) {
    this._profile = value;
    this.handleDataChange();
  }

  handleDataChange() {
    this.dob = new Date(this._profile?.dob);
    this.findWorkingAddress(this._profile?.workingPlace);
    this.findGender(this._profile?.genderCode);
  }

  subscribeDataStreams() {
    this.configurationService.departments$.subscribe(departments => {
      this.departments = departments;
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

  findWorkingAddress(address?: string) {
    if (!address) return;
    for (let workingPlace of this.workingPlaces) {
      if (workingPlace.value === address) {
        this.selectedWorkingPlace = workingPlace;
        break;
      }
    }
  }

  findGender(gender?: string) {
    if (!gender) return;
    for (let genderOption of this.genderOptions) {
      if (genderOption.code === gender) {
        this.selectedGender = genderOption;
        break;
      }
    }
  }
}
