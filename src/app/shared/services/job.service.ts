import {Injectable} from '@angular/core';
import {Job} from "../model/job";
import {ApiResponse} from "../model/api.model";
import {API_URL} from "../constants/api";
import {PerformJobRequest} from "../model/perform-job-request";
import {getHttpRestOption} from "../utils/http.util";
import {GetJobsQuery} from "../model/get-jobs-query.model";
import {CandidateApplication} from "../model/candidate-application.model";
import {StatusLogResponse} from "../model/status-log.model";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  searchJob$: Subject<{ query: string, department: string }> = new BehaviorSubject({query: "", department: ""});

  constructor(private http: HttpClient) {
  }

  getJobByID(id: number) {
    return this.http.get<ApiResponse<Job>>("http://localhost:8080/api/jobs/" + id);
  }

  getAllJobs(params?: GetJobsQuery) {
    // const headers = getHttpRestOption();
    let paramsURL: string = "";
    if (params) {
      paramsURL += `jobId=${params?.jobId}&`;
      paramsURL += `interviewEmail=${params?.interviewEmail}&`;
      paramsURL += `status=${params?.status}&`;
    }
    return this.http.get("http://localhost:8080/api/jobs?" + paramsURL);
  }

  createJob(job: PerformJobRequest) {

    return this.http.post(API_URL.JOBS.CREATE_JOB, job);
  }

  update(id: number, job: PerformJobRequest) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(API_URL.JOBS.UPDATE_JOB + `/${id}`, job, httpOptions);
  }

  getHiringJobs(params: any) {
    return this.http.get<ApiResponse<Job[]>>(API_URL.JOBS.GET_HIRING_JOB, {params: params});
  }

  getHiringDetailJob(id: string) {
    return this.http.get<ApiResponse<Job>>(API_URL.JOBS.GET_HIRING_JOB + `/${id}`);
  }

  applyToJob(formData: FormData) {
    return this.http.post<ApiResponse<any>>(API_URL.APPLICATIONS.CREATE_APPLICATION, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  getCandidateApplication(params: any) {
    let paramsURL: string = "";
    if (params) {
      paramsURL += `?jobId=${params?.jobId}&`;
      paramsURL += `interviewEmail=${params?.interviewEmail}&`;
      paramsURL += `status=${params?.status ?? "ALL"}`;
    }

    return this.http.get<ApiResponse<CandidateApplication[]>>(API_URL.APPLICATIONS.GET_APPLICATION + `${paramsURL}`);
  }

  getCandidateApplicationById(id: any) {
    return this.http.get<ApiResponse<CandidateApplication>>(API_URL.APPLICATIONS.GET_APPLICATION + "/" + `${id}`);
  }

  changeStatusApplicationById(candidateId: any, params: any) {
    return this.http.put<ApiResponse<StatusLogResponse>>(API_URL.APPLICATIONS.CREATE_STATUS_APPLICATION(candidateId), params);
  }
}
