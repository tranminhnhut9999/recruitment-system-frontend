import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {PanelModule} from 'primeng/panel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardHeaderComponent} from './components/dashboard-header/dashboard-header.component';
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {RecruitmentComponent} from './components/dashboard/recruitment/recruitment.component';
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import {DashboardSidebarComponent} from './components/dashboard-sidebar/dashboard-sidebar.component';
import {
  RecruitmentHeaderComponent
} from './components/dashboard/recruitment/recruitment-header/recruitment-header.component';
import {ToolbarModule} from "primeng/toolbar";
import {JobPostingComponent} from './components/dashboard/job-posting/job-posting.component';
import {DividerModule} from "primeng/divider";
import {TabViewModule} from "primeng/tabview";
import {EditorModule} from "primeng/editor";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {MultiSelectModule} from "primeng/multiselect";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {AccountProfileComponent} from './components/dashboard/account-profile/account-profile.component';
import {JobListComponent} from './components/candidate-job/job-displaying/job-list/job-list.component';
import {JobCardComponent} from './components/job-card/job-card.component';
import {CardModule} from "primeng/card";
import {ChipsModule} from "primeng/chips";
import {JobDetailComponent} from './components/candidate-job/job-displaying/job-detail/job-detail.component';
import {JobDisplayingComponent} from './components/candidate-job/job-displaying/job-displaying.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {ToggleButtonModule} from "primeng/togglebutton";
import {SelectButtonModule} from "primeng/selectbutton";
import {
  ApplyJobFormComponent
} from './components/candidate-job/job-displaying/job-detail/apply-job-form/apply-job-form.component';
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ApplicationComponent} from "./components/dashboard/application/application.component";
import {AccordionModule} from "primeng/accordion";
import {UtcToDatePipe} from './shared/pipes/utc-to-date.pipe';
import {DetailApplicationComponent} from './components/dashboard/detail-application/detail-application.component';
import {UtcToLocalPipe} from './shared/pipes/utc-to-local.pipe';
import {ApplicationStateLabelPipe} from './shared/pipes/application-state-label.pipe';
import {ApplicationStateComponent} from './components/dashboard/application-state/application-state.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {StyleClassModule} from "primeng/styleclass";
import {
  JobTypeConfigurationComponent
} from './components/dashboard/configuration/job-type-configuration/job-type-configuration.component';
import {CastPipe} from './shared/pipes/cast.pipe';
import {
  DepartmentConfigurationComponent
} from './components/dashboard/configuration/department-configuration/department-configuration.component';
import {
  SkillConfigurationComponent
} from './components/dashboard/configuration/skill-configuration/skill-configuration.component';
import {StaffManagementComponent} from './components/dashboard/staff-management/staff-management.component';
import {RegisterStaffComponent} from './components/dashboard/register-staff/register-staff.component';
import {StaffDetailComponent} from './components/dashboard/staff-management/staff-detail/staff-detail.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { WorkingAddressComponent } from './components/dashboard/configuration/working-address/working-address.component';
import { ChangePasswordDialogComponent } from './components/dashboard/account-profile/change-password-dialog/change-password-dialog.component';
import { HrRoleGuardPipe } from './shared/pipes/hr-role-guard.pipe';
import { VndShorthandPipe } from './shared/pipes/vnd-shorthand.pipe';


export const authInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    RecruitmentComponent,
    DashboardSidebarComponent,
    RecruitmentHeaderComponent,
    JobPostingComponent,
    AccountProfileComponent,
    JobListComponent,
    JobCardComponent,
    JobDetailComponent,
    JobDisplayingComponent,
    ApplyJobFormComponent,
    ApplicationComponent,
    UtcToDatePipe,
    DetailApplicationComponent,
    UtcToLocalPipe,
    ApplicationStateLabelPipe,
    ApplicationStateComponent,
    JobTypeConfigurationComponent,
    CastPipe,
    DepartmentConfigurationComponent,
    SkillConfigurationComponent,
    StaffManagementComponent,
    RegisterStaffComponent,
    StaffDetailComponent,
    WorkingAddressComponent,
    ChangePasswordDialogComponent,
    HrRoleGuardPipe,
    VndShorthandPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    NgOptimizedImage,
    MenubarModule,
    AvatarModule,
    MenuModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
    DividerModule,
    TabViewModule,
    EditorModule,
    DropdownModule,
    PaginatorModule,
    MultiSelectModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    ChipsModule,
    HttpClientModule,
    CalendarModule,
    CheckboxModule,
    ToggleButtonModule,
    SelectButtonModule,
    DialogModule,
    FileUploadModule,
    AccordionModule,
    InputTextareaModule,
    StyleClassModule
  ],
  providers: [ConfirmationService, MessageService, authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
