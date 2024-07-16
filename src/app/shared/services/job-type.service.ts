import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobType} from "../model/job-type.model";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {ApiResponse} from "../model/api.model";
import {getHttpRestOption} from "../utils/http.util";

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  private apiUrl = `http://localhost:8084/api/configuration/job-types`;
  jobTypes$: Subject<JobType[]> = new ReplaySubject<JobType[]>(1);

  constructor(private http: HttpClient) {
    this.loadJobType();
  }

  createJobType(jobType: JobType): Observable<JobType> {
    let httpRestOption = getHttpRestOption();
    return this.http.post<JobType>(this.apiUrl, jobType, httpRestOption);
  }

  loadJobType() {
    this.http.get<ApiResponse<JobType[]>>(this.apiUrl).subscribe({
      next: response => {
        this.jobTypes$.next(response.data);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
