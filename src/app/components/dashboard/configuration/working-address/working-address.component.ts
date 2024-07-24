import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {WorkingAddress} from "../../../../shared/model/working-address.model";

@Component({
  selector: 'app-working-address',
  templateUrl: './working-address.component.html',
  styleUrls: ['./working-address.component.scss']
})
export class WorkingAddressComponent {
  workingAddressForm: FormGroup;
  workingAddresses: WorkingAddress[] = [];
  displayWorkingAddresses: WorkingAddress[] = [];
  loading: boolean = true;

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.workingAddressForm = this.fb.group({
      address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.workingAddresses$.subscribe(workingAddresses => {
      if (workingAddresses) {
        this.workingAddresses = workingAddresses;
        this.displayWorkingAddresses = [...workingAddresses];
      } else {
        this.workingAddresses = [];
        this.displayWorkingAddresses = [];
      }
      this.loading = false
    });

  }

  onSubmit() {
    if (this.workingAddressForm.valid) {
      const workingAddress: WorkingAddress = this.workingAddressForm.value;
      if (this.isExistWorkingAddress(workingAddress.address)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất Bại',
          detail: 'Địa chỉ đã tồn tại',
        });
        return;
      }
      this.configurationService.createWorkingAddress(workingAddress).subscribe(
        (response: any) => {
          this.configurationService.loadWorkingAddress();
          this.workingAddressForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Thêm địa chỉ thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Thêm địa chỉ thất bại',
          });
        }
      );
    }
  }

  filterTable(event: Event) {
    let filterWord = (event.target as HTMLInputElement).value;
    if (filterWord.length > 0) {
      this.displayWorkingAddresses = this.displayWorkingAddresses
        .filter(jb => jb.address.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.address));
    } else {
      this.displayWorkingAddresses = [...this.workingAddresses];
    }
  }

  isExistWorkingAddress(newName: string) {
    return this.workingAddresses.filter(jb => jb.address.toLowerCase() == newName.toLowerCase()).length > 0;
  }

  deleteWorkingAddress(workingAddress: WorkingAddress) {
    if (workingAddress && workingAddress.id) {
      this.configurationService.deleteWorkingAddress(workingAddress.id).subscribe(
        (response: any) => {
          this.configurationService.loadWorkingAddress();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Xóa địa chỉ thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Xóa đia chỉ thất bại',
          });
        }
      );
    }
  }
}
