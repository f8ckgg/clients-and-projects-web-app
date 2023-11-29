import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectDTO} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = environment.apiUrl+'/api/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(`${this.API_URL}`);
  }
  getAllProjects2(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(`${this.API_URL}/design`);
  }


  createProject(project: ProjectDTO): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(`${this.API_URL}`, project);
  }


  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  setProjectMade(id: number): Observable<ProjectDTO> {
    return this.http.put<ProjectDTO>(`${this.API_URL}/made/${id}`, {});
  }
}
