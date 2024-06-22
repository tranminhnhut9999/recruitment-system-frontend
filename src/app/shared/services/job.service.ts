import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JobResponse} from "../model/job.response";
import {ApiResponse} from "../model/api.model";
import {API_URL} from "../constants/api";
import {PerformJobRequest} from "../model/perform-job-request";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  getJobByID(id: number) {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.replaceAll('"', '')}`);
    return this.http.get<ApiResponse<JobResponse>>("http://localhost:8082/api/jobs/" + id, {headers: headers});
  }

  createJob(job: PerformJobRequest) {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token!.replaceAll('"', '')}` : ""
      })
    }
    return this.http.post(API_URL.CREATE_JOB, job, httpOptions);
  }

  update(id: number, job: PerformJobRequest) {
    const token = localStorage.getItem("access_token"); // Retrieve your token from wherever you store it
    // @ts-ignore
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token!.replaceAll('"', '')}` : ""
      })
    }
    return this.http.put(API_URL.UPDATE_JOB + `/${id}`, job, httpOptions);
  }
}
