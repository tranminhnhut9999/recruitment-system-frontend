import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Job} from "../model/job";
import {ApiResponse} from "../model/api.model";
import {API_URL} from "../constants/api";
import {PerformJobRequest} from "../model/perform-job-request";
import {getHttpRestOption} from "../utils/http.util";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  getJobByID(id: number) {
    const httpOptions = getHttpRestOption();

    return this.http.get<ApiResponse<Job>>("http://localhost:8082/api/jobs/" + id, httpOptions);
  }

  createJob(job: PerformJobRequest) {
    const httpOptions = getHttpRestOption();

    return this.http.post(API_URL.CREATE_JOB, job, httpOptions);
  }

  update(id: number, job: PerformJobRequest) {
    const httpOptions = getHttpRestOption();

    return this.http.put(API_URL.UPDATE_JOB + `/${id}`, job, httpOptions);
  }

  getHiringJobs() {
    return this.http.get<ApiResponse<Job[]>>(API_URL.GET_HIRING_JOB);
  }

  getHiringDetailJob(id: string) {
    return this.http.get<ApiResponse<Job>>(API_URL.GET_HIRING_JOB + `/${id}`);
  }

  applyToJob(formData: FormData) {
    const httpOptions = getHttpRestOption();
    return this.http.post<ApiResponse<any>>(API_URL.CREATE_APPLICATION, formData);
  }
}
