import {NgModule} from '@angular/core';
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
import {HttpClientModule} from "@angular/common/http";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {ToggleButtonModule} from "primeng/togglebutton";
import {SelectButtonModule} from "primeng/selectbutton";
import { ApplyJobFormComponent } from './components/candidate-job/job-displaying/job-detail/apply-job-form/apply-job-form.component';
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";

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
    FileUploadModule
  ],
    providers: [ConfirmationService, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
