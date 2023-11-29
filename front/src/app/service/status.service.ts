import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatusDTO} from "../interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly API_URL = environment.apiUrl+'/api/statuses';

  constructor(private http: HttpClient) {
  }

  getAllStatuses(projectId: number): Observable<StatusDTO[]> {
    const url = `${this.API_URL}/${projectId}`;
    return this.http.get<StatusDTO[]>(url);
  }


  createDesignerConfirmedStatus(projectId: number): Observable<StatusDTO> {
    const url = `${this.API_URL}/confirm/${projectId}`;
    return this.http.post<StatusDTO>(url, {});
  }

  createAdminApprovedStatus(projectId: number): Observable<StatusDTO> {
    const url = `${this.API_URL}/approve/${projectId}`;
    return this.http.post<StatusDTO>(url, {});
  }

  createAdminDisapprovedStatus(projectId: number): Observable<StatusDTO> {
    const url = `${this.API_URL}/disapprove/${projectId}`;
    return this.http.post<StatusDTO>(url, {});
  }

  getLastStatusByProjectId(projectId: number): Observable<string> {
    const url = `${this.API_URL}/lastStatus/${projectId}`;
    return this.http.get<string>(url);
  }
  getArithmeticMean(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/mean`);
  }

}
