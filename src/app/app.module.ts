import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {NgOptimizedImage} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import { RecruitmentComponent } from './components/dashboard/recruitment/recruitment.component';
import {SidebarModule} from "primeng/sidebar";
import {TableModule} from "primeng/table";
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { RecruitmentHeaderComponent } from './components/dashboard/recruitment/recruitment-header/recruitment-header.component';
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    RecruitmentComponent,
    DashboardSidebarComponent,
    RecruitmentHeaderComponent,
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
        ToolbarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
