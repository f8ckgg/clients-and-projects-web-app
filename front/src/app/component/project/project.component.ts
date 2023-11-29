import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {ClientDTO, ProjectDTO, UserDTO} from "../../interfaces";
import {UserService} from "../../service/user.service";
import {ProjectService} from "../../service/project.service";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm: FormGroup;
  designers$: Observable<UserDTO[]> | undefined;
  clients$: Observable<ClientDTO[]> | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.formBuilder.group({
      client:['', Validators.required],
      designer: ['', Validators.required],
      name: ['', Validators.required],
      link: ['', Validators.required],
      address: ['', Validators.required],
      square: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.designers$ = this.userService.getAllUsers();
    this.clients$=this.clientService.getAllClients();
  }

  createProject(): void {
    const projectPojo = this.projectForm.value;
    const designerId = projectPojo.designer;
    const designer: UserDTO = { id: designerId, name: '', email:'', password:''};
    projectPojo.designer = designer;
    const clientId = projectPojo.client;
    const client: ClientDTO = { id: clientId, name: '', email:''};
    projectPojo.client = client;
    this.projectService.createProject(projectPojo).subscribe(
      () => {  this.router.navigate(['/projects']);
      }
    );
  }

}

