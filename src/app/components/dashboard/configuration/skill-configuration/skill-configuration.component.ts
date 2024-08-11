import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../../shared/model/department.model";
import {ConfigurationService} from "../../../../shared/services/configuration.service";
import {MessageService} from "primeng/api";
import {Skill} from "../../../../shared/model/skill.model";
import {debounceTime, distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-skill-configuration',
  templateUrl: './skill-configuration.component.html',
  styleUrls: ['./skill-configuration.component.scss']
})
export class SkillConfigurationComponent {
  skillForm: FormGroup;
  skills: Skill[] = [];
  filterSkills: Skill[] = [];
  loading: boolean = true;
  searchControl: FormControl = new FormControl<any>('');

  constructor(private fb: FormBuilder, private configurationService: ConfigurationService, private messageService: MessageService) {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    });
    this.configurationService.skill$.subscribe(skills => {
      if (skills) {
        this.skills = skills;
        this.filterSkills = this.skills;
      } else {
        this.skills = [];
        this.filterSkills = [];
      }
      this.loading = false
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(1000), // 1-second delay
      distinctUntilChanged(),
      map((searchTerm) => this.filterSkill(searchTerm))
    ).subscribe(filtered => {
      this.filterSkills = filtered;
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
      this.filterSkills = this.filterSkills
        .filter(jb => jb.name.toLowerCase().includes(filterWord) || filterWord.toLowerCase().includes(jb.name));
    } else {
      this.filterSkills = [...this.skills];
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

  filterSkill(searchTerm: string): Skill[] {
    if (!searchTerm) {
      return this.skills;
    }

    searchTerm = searchTerm.toLowerCase();

    return this.skills.filter(skill => {
      const skillName = this.removeDiacritics(skill.name).toLowerCase();
      return skillName.includes(searchTerm);
    });
  }

  // Helper function to remove diacritics for Vietnamese search
  removeDiacritics(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
