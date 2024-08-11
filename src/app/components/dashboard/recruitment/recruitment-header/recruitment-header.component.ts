import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {ROLE} from "../../../../shared/constants/role-config";

@Component({
  selector: 'app-recruitment-header',
  templateUrl: './recruitment-header.component.html',
  styleUrls: ['./recruitment-header.component.scss']
})
export class RecruitmentHeaderComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  isHrManager: boolean = false;

  ngOnInit() {
    this.isHrManager = this.authService.userHasRoles([ROLE.HR_MANAGER]);
  }
}
