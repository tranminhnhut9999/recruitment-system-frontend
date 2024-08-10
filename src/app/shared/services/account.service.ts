import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {getHttpMultiPartOption, getHttpRestOption} from "../utils/http.util";
import {ReplaySubject} from "rxjs";
import {ProfileResponse} from "../model/account.model";
import {ApiResponse} from "../model/api.model";
import {ChangePasswordRequest} from "../model/change-password.model";
import {API_URL} from "../constants/api";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private BASE_URL = 'http://localhost:8081/api/';
  private ACCOUNT_URL = this.BASE_URL + 'accounts';
  private CHANGE_STATUS_URL = this.ACCOUNT_URL + "/change-status";
  private RESET_PASSWORD_URL = this.ACCOUNT_URL + "/reset-password";
  private PROFILE_URL = this.ACCOUNT_URL + "/profile";
  private UPDATE_PROFILE_URL = this.ACCOUNT_URL + "/{id}/profile";
  accounts$: ReplaySubject<ProfileResponse[]> = new ReplaySubject(1);

  constructor(private http: HttpClient) {
  }

  createAccount(request: any) {
    return this.http.post(this.ACCOUNT_URL, request);
  }

  loadAccount(request?: any) {
    this.getAccount().subscribe({
      next: response => {
        this.accounts$.next(response.data);
      }
    })
  }

  getAccount(request?: any) {
    return this.http.get<ApiResponse<ProfileResponse[]>>(this.ACCOUNT_URL);
  }

  getAccountProfile() {
    return this.http.get<ApiResponse<ProfileResponse>>(this.PROFILE_URL);
  }

  changeStatusAccount(params?: any) {
    let paramsURL = "";
    if (params) {
      paramsURL = "?";
      Object.keys(params).forEach(key => {
        paramsURL += `${key}=${params[key]}`;
      })
    }
    return this.http.put<ApiResponse<string>>(this.CHANGE_STATUS_URL, params);
  }

  resetPassword(accountId: number) {
    return this.http.put<ApiResponse<string>>(this.RESET_PASSWORD_URL, {accountId: accountId});
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.put<ApiResponse<any>>(API_URL.AUTH.CHANGE_PASSWORD, request);
  }

  updateProfile(id: any, formData: FormData) {
    return this.http.post<ApiResponse<any>>(this.UPDATE_PROFILE_URL.replace("{id}", id), formData, getHttpMultiPartOption());
  }
}
