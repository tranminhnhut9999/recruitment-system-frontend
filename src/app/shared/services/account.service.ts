import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getHttpRestOption} from "../utils/http.util";
import {ReplaySubject} from "rxjs";
import {ProfileResponse} from "../model/account.model";
import {ApiResponse} from "../model/api.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private BASE_URL = 'http://localhost:8081/api/';
  private ACCOUNT_URL = this.BASE_URL + 'accounts';
  accounts$: ReplaySubject<ProfileResponse[]> = new ReplaySubject(1);

  constructor(private http: HttpClient) {
  }

  createAccount(request: any) {
    let httpRestOption = getHttpRestOption();
    return this.http.post(this.ACCOUNT_URL, request, httpRestOption);
  }

  loadAccount(request?: any) {
    this.getAccount().subscribe({
      next: response => {
        this.accounts$.next(response.data);
      }
    })
  }

  getAccount(request?: any) {
    let httpRestOption = getHttpRestOption();
    return this.http.get<ApiResponse<ProfileResponse[]>>(this.ACCOUNT_URL, httpRestOption);
  }
}
