import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RecruitmentComponent} from "./components/dashboard/recruitment/recruitment.component";
import {JobPostingComponent} from "./components/dashboard/job-posting/job-posting.component";
import {AccountProfileComponent} from "./components/dashboard/account-profile/account-profile.component";
import {JobListComponent} from "./components/candidate-job/job-displaying/job-list/job-list.component";
import {JobDetailComponent} from "./components/candidate-job/job-displaying/job-detail/job-detail.component";
import {JobDisplayingComponent} from "./components/candidate-job/job-displaying/job-displaying.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {ApplicationComponent} from "./components/dashboard/application/application.component";
import {DetailApplicationComponent} from "./components/dashboard/detail-application/detail-application.component";
import {
  JobTypeConfigurationComponent
} from "./components/dashboard/configuration/job-type-configuration/job-type-configuration.component";
import {
  DepartmentConfigurationComponent
} from "./components/dashboard/configuration/department-configuration/department-configuration.component";
import {
  SkillConfigurationComponent
} from "./components/dashboard/configuration/skill-configuration/skill-configuration.component";
import {StaffManagementComponent} from "./components/dashboard/staff-management/staff-management.component";
import {RegisterStaffComponent} from "./components/dashboard/register-staff/register-staff.component";
import {WorkingAddressComponent} from "./components/dashboard/configuration/working-address/working-address.component";

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: "recruitment",
        component: RecruitmentComponent,
      },
      {
        path: '',
        redirectTo: "recruitment",
        pathMatch: "full"
      },
      {
        path: "jobs/:id",
        component: JobPostingComponent,
        pathMatch: "full"
      },
      {
        path: "job-posting",
        component: JobPostingComponent
      },
      {
        path: 'account', component: AccountProfileComponent
      },
      {
        path: 'jobs/:jobId/candidates',
        children: [
          {
            path: "",
            pathMatch: "full",
            component: ApplicationComponent
          },
          {
            path: ":applicationId",
            pathMatch: "full",
            component: DetailApplicationComponent
          }
        ]
      },
      {
        path: "job-types",
        component: JobTypeConfigurationComponent
      },
      {
        path: "departments",
        component: DepartmentConfigurationComponent
      },
      {
        path: "skills",
        component: SkillConfigurationComponent
      },
      {
        path: "staff-management",
        component: StaffManagementComponent
      },
      {
        path: "staff-register",
        component: RegisterStaffComponent
      },
      {
        path: "working-address",
        component: WorkingAddressComponent
      }
    ]
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "jobs",
    children: [
      {
        path: 'hiring',
        component: JobDisplayingComponent,
        children: [
          {
            path: '',
            pathMatch: "full",
            component: JobListComponent
          },
          {
            path: ":id",
            component: JobDetailComponent
          }
        ]
      },

    ]
  },
  {path: '', redirectTo: 'login', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
