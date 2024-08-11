import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {WorkingAddress} from "../../../../shared/model/working-address.model";
import {debounceTime, distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-working-address',
  templateUrl: './working-address.component.html',
  styleUrls: ['./working-address.component.scss']
})
export class WorkingAddressComponent {
  workingAddressForm: FormGroup;
  workingAddresses: WorkingAddress[] = [];
  filterWorkingAddresses: WorkingAddress[] = [];
  loading: boolean = true;
  searchControl: FormControl = new FormControl('');

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.workingAddressForm = this.fb.group({
      address: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.workingAddresses$.subscribe(workingAddresses => {
      if (workingAddresses) {
        this.workingAddresses = workingAddresses;
        this.filterWorkingAddresses = [...workingAddresses];
      } else {
        this.workingAddresses = [];
        this.filterWorkingAddresses = [];
      }
      this.loading = false
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // 1-second delay
      distinctUntilChanged(),
      map((searchTerm) => this.filterWorkingAddress(searchTerm ? searchTerm : ""))
    ).subscribe(filtered => {
      console.log("FILTER JOB")
      this.filterWorkingAddresses = filtered;
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
          this.searchControl.reset();
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
      this.filterWorkingAddresses = this.filterWorkingAddresses
        .filter(jb => jb.address.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.address));
    } else {
      this.filterWorkingAddresses = [...this.workingAddresses];
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

  filterWorkingAddress(searchTerm: string): WorkingAddress[] {
    if (!searchTerm || searchTerm.length == 0) {
      return this.workingAddresses;
    }

    searchTerm = searchTerm.toLowerCase();

    return this.workingAddresses.filter(workingAddress => {
      const address = this.removeDiacritics(workingAddress.address).toLowerCase();

      return address.includes(searchTerm);
    });
  }

  // Helper function to remove diacritics for Vietnamese search
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
