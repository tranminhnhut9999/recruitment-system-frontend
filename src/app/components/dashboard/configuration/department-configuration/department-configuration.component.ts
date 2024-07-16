import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {Department} from "../../../../shared/model/department.model";

@Component({
  selector: 'app-department-configuration',
  templateUrl: './department-configuration.component.html',
  styleUrls: ['./department-configuration.component.scss']
})
export class DepartmentConfigurationComponent {
  departmentForm: FormGroup;
  departments: Department[] = [];
  displayDepartment: Department[] = [];
  loading: boolean = true;

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.departments$.subscribe(departments => {
      if (departments) {
        this.departments = departments;
        this.displayDepartment = [...departments];
      }else{
        this.departments = [];
        this.displayDepartment = [];
      }
      this.loading = false
    });

  }

  onSubmit() {
    if (this.departmentForm.valid) {
      const department: Department = this.departmentForm.value;
      if (this.isExistDepartment(department.name)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất Bại',
          detail: 'Bộ Phận Đã Tồn Tại',
        });
        return;
      }
      this.configurationService.createDepartment(department).subscribe(
        (response: any) => {
          this.configurationService.loadDepartment();
          this.departmentForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Tạo bộ phận thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Tạo bộ phận thất bại',
          });
        }
      );
    }
  }

  filterTable(event: Event) {
    let filterWord = (event.target as HTMLInputElement).value;
    if (filterWord.length > 0) {
      this.displayDepartment = this.displayDepartment
        .filter(jb => jb.name.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.name));
    } else {
      this.displayDepartment = [...this.departments];
    }
  }

  isExistDepartment(newName: string) {
    return this.departments.filter(jb => jb.name.toLowerCase() == newName.toLowerCase()).length > 0;
  }

  deleteDepartment(department: Department) {
    if (department && department.id) {
      this.configurationService.deleteDepartment(department.id).subscribe(
        (response: any) => {
          this.configurationService.loadDepartment();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Xóa bộ phận thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Xóa bộ phận thất bại',
          });
        }
      );
    }
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
