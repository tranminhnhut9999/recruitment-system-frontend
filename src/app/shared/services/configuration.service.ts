import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobType} from "../model/job-type.model";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {ApiResponse} from "../model/api.model";
import {getHttpRestOption} from "../utils/http.util";
import {Department} from "../model/department.model";
import {Skill} from "../model/skill.model";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private CONFIGURATION_BASE_URL = `http://localhost:8084/api/configuration`;
  private JOB_TYPE_URL = `${this.CONFIGURATION_BASE_URL}/job-types`;
  private DEPARTMENT_URL = `${this.CONFIGURATION_BASE_URL}/departments`;
  private SKILL_URL = `${this.CONFIGURATION_BASE_URL}/skills`;


  jobTypes$: Subject<JobType[]> = new ReplaySubject<JobType[]>(1);
  departments$: Subject<Department[]> = new ReplaySubject<Department[]>(1);
  skill$: Subject<Skill[]> = new ReplaySubject<Skill[]>(1);

  constructor(private http: HttpClient) {
    this.loadJobType();
    this.loadDepartment();
    this.loadSkill();
  }

  /** JOB TYPE CONFIGURATION */
  createJobType(jobType: JobType): Observable<JobType> {
    let httpRestOption = getHttpRestOption();
    return this.http.post<JobType>(this.JOB_TYPE_URL, jobType, httpRestOption);
  }

  loadJobType() {
    this.http.get<ApiResponse<JobType[]>>(this.JOB_TYPE_URL).subscribe({
      next: response => {
        this.jobTypes$.next(response.data);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteJobType(id: number) {
    let httpRestOption = getHttpRestOption();
    return this.http.delete<ApiResponse<JobType[]>>(this.JOB_TYPE_URL + `/${id}`, httpRestOption);
  }


  /** DEPARTMENT CONFIGURATION */

  createDepartment(department: Department): Observable<Department> {
    let httpRestOption = getHttpRestOption();
    return this.http.post<Department>(this.DEPARTMENT_URL, department, httpRestOption);
  }

  loadDepartment() {
    this.http.get<ApiResponse<Department[]>>(this.DEPARTMENT_URL).subscribe({
      next: response => {
        this.departments$.next(response.data);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteDepartment(id: number) {
    let httpRestOption = getHttpRestOption();
    return this.http.delete<ApiResponse<any>>(this.DEPARTMENT_URL + `/${id}`, httpRestOption);
  }


  /**  SKILL CONFIGURATION  */
  createSkill(department: Skill): Observable<Skill> {
    let httpRestOption = getHttpRestOption();
    return this.http.post<Skill>(this.SKILL_URL, department, httpRestOption);
  }

  loadSkill() {
    this.http.get<ApiResponse<Skill[]>>(this.SKILL_URL).subscribe({
      next: response => {
        this.skill$.next(response.data);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteSkill(id: number) {
    let httpRestOption = getHttpRestOption();
    return this.http.delete<ApiResponse<any>>(this.SKILL_URL + `/${id}`, httpRestOption);
  }
}
