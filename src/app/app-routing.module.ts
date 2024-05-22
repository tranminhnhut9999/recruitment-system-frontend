import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RecruitmentComponent} from "./components/dashboard/recruitment/recruitment.component";

const routes: Routes = [
    {
        path: "dashboard", component: DashboardComponent, children: [
            {
                path: "recruitment",
                component: RecruitmentComponent,
            }
        ]
    },
    {path: '', redirectTo: 'dashboard/recruitment', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
