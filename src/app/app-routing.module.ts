import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RecruitmentComponent} from "./components/dashboard/recruitment/recruitment.component";
import {JobPostingComponent} from "./components/dashboard/job-posting/job-posting.component";
import {AccountProfileComponent} from "./components/dashboard/account-profile/account-profile.component";
import {JobListComponent} from "./components/job-list/job-list.component";
import {JobDetailComponent} from "./components/job-detail/job-detail.component";

const routes: Routes = [
  {
    path: "dashboard", component: DashboardComponent, children: [
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
        component: JobListComponent
      },
      {path: ':id', component: JobDetailComponent}
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
