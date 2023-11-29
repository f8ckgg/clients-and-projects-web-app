import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ClientService} from "../../service/client.service";
import {ClientDTO} from "../../interfaces";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: ClientDTO[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  viewClientDetails(clientId: number) {
    this.router.navigate(['/client', clientId]);
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  createClient(): void {
    this.router.navigate(['/client/create']);
  }
}

