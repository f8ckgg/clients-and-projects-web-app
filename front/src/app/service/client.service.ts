import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ClientDTO} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API_URL = environment.apiUrl + '/api/clients';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(this.API_URL);
  }

  getClientById(id: number): Observable<ClientDTO> {
    return this.http.get<ClientDTO>(`${this.API_URL}/${id}`);
  }

  createClient(clientDTO: ClientDTO): Observable<ClientDTO> {
    return this.http.post<ClientDTO>(this.API_URL, clientDTO);
  }

  updateClient(id: number, clientDTO: ClientDTO): Observable<ClientDTO> {
    return this.http.put<ClientDTO>(`${this.API_URL}/${id}`, clientDTO);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
