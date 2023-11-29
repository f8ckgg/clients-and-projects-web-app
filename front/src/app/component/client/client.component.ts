import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {ClientService} from "../../service/client.service";
import {ClientDTO} from "../../interfaces";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  clientId: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe((client: ClientDTO) => {
        this.clientForm.patchValue({
          name: client.name,
          email: client.email,
        });
      });
    }
  }

  onSubmit(): void {
    const clientPojo = this.clientForm.value;
    if (this.clientId) {
      this.clientService.updateClient(this.clientId, clientPojo).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.createClient(clientPojo).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  onDelete(): void {
    this.clientService.deleteClient(this.clientId).subscribe(() => {
      this.router.navigate(['/clients']);
    });
  }
}
