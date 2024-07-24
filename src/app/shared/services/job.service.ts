import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Job} from "../model/job";
import {ApiResponse} from "../model/api.model";
import {API_URL} from "../constants/api";
import {PerformJobRequest} from "../model/perform-job-request";
import {getHttpRestOption} from "../utils/http.util";
import {GetJobsQuery} from "../model/get-jobs-query.model";
import {CandidateApplication} from "../model/candidate-application.model";
import {StatusLogResponse} from "../model/status-log.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {
  }

  getJobByID(id: number) {
    return this.http.get<ApiResponse<Job>>("http://localhost:8082/api/jobs/" + id);
  }

  getAllJobs(params?: GetJobsQuery) {
    // const headers = getHttpRestOption();
    let paramsURL: string = "";
    if (params) {
      paramsURL += `jobId=${params?.jobId}&`;
      paramsURL += `interviewEmail=${params?.interviewEmail}&`;
      paramsURL += `status=${params?.status}&`;
    }
    return this.http.get("http://localhost:8082/api/jobs?" + paramsURL);
  }

  createJob(job: PerformJobRequest) {

    return this.http.post(API_URL.CREATE_JOB, job);
  }

  update(id: number, job: PerformJobRequest) {

    return this.http.put(API_URL.UPDATE_JOB + `/${id}`, job);
  }

  getHiringJobs() {
    return this.http.get<ApiResponse<Job[]>>(API_URL.GET_HIRING_JOB);
  }

  getHiringDetailJob(id: string) {
    return this.http.get<ApiResponse<Job>>(API_URL.GET_HIRING_JOB + `/${id}`);
  }

  applyToJob(formData: FormData) {
    return this.http.post<ApiResponse<any>>(API_URL.CREATE_APPLICATION, formData);
  }

  getCandidateApplication(params: any) {
    let paramsURL: string = "";
    if (params) {
      paramsURL += `?jobId=${params?.jobId}&`;
      paramsURL += `interviewEmail=${params?.interviewEmail}&`;
      paramsURL += `status=${params?.status ?? "ALL"}`;
    }

    return this.http.get<ApiResponse<CandidateApplication[]>>(API_URL.GET_APPLICATION + `${paramsURL}`);
  }

  getCandidateApplicationById(id: any) {
    return this.http.get<ApiResponse<CandidateApplication>>(API_URL.GET_APPLICATION + "/" + `${id}`);
  }

  changeStatusApplicationById(candidateId: any, params: any) {
    return this.http.put<ApiResponse<StatusLogResponse>>(API_URL.CREATE_STATUS_APPLICATION.replace("<ID>", candidateId), params);
  }
}
