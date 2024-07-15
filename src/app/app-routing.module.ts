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

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: "recruitment",
        component: RecruitmentComponent,
        canActivate: [AuthGuard]
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
        path: '',
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
  exports: [RouterModule]
})
export class AppRoutingModule {
}
