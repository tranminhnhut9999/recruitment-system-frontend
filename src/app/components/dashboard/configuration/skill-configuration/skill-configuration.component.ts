import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {Skill} from "../../../../shared/model/skill.model";

@Component({
  selector: 'app-skill-configuration',
  templateUrl: './skill-configuration.component.html',
  styleUrls: ['./skill-configuration.component.scss']
})
export class SkillConfigurationComponent {
  skillForm: FormGroup;
  skills: Department[] = [];
  displaySkills: Department[] = [];
  loading: boolean = true;

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.skill$.subscribe(skills => {
      if (skills) {
        this.skills = skills;
        this.displaySkills = [...skills];
      } else {
        this.skills = [];
        this.displaySkills = [];
      }
      this.loading = false
    });

  }

  onSubmit() {
    if (this.skillForm.valid) {
      const department: Department = this.skillForm.value;
      if (this.isExistSkill(department.name)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất Bại',
          detail: 'Kĩ Năng Đã Tồn Tại',
        });
        return;
      }
      this.configurationService.createSkill(department).subscribe(
        (response: any) => {
          this.configurationService.loadSkill();
          this.skillForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Tạo kĩ năng thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Tạo kĩ năng thất bại',
          });
        }
      );
    }
  }

  filterTable(event: Event) {
    let filterWord = (event.target as HTMLInputElement).value;
    if (filterWord.length > 0) {
      this.displaySkills = this.displaySkills
        .filter(jb => jb.name.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.name));
    } else {
      this.displaySkills = [...this.skills];
    }
  }

  isExistSkill(newName: string) {
    return this.skills.filter(jb => jb.name.toLowerCase() == newName.toLowerCase()).length > 0;
  }

  deleteSkill(skill: Skill) {
    if (skill && skill.id) {
      this.configurationService.deleteSkill(skill.id).subscribe(
        (response: any) => {
          this.configurationService.loadSkill();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành Công',
            detail: 'Xóa kĩ năng thành công',
          });
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất Bại',
            detail: 'Xóa kĩ năng thất bại',
          });
        }
      );
    }
  }
}
