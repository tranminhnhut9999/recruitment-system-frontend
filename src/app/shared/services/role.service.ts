import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, ReplaySubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../constants/api";
import {JwtUtilService} from "./jwt.service";
import {AccountProfileComponent} from "../../components/dashboard/account-profile/account-profile.component";
import {ProfileResponse, RoleResponse} from "../model/profile.model";
import {ApiResponse} from "../model/api.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles$: ReplaySubject<RoleResponse[]> = new ReplaySubject<RoleResponse[]>(1);

  constructor(private http: HttpClient) {
    this.loadRoles();
  }

  loadRoles() {
    this.getRoles().subscribe(response => this.roles$.next(response.data));
  }

  getRoles() {
    return this.http.get<ApiResponse<RoleResponse[]>>("http://localhost:8080/api/roles");
  }
}
