import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {ProjectService} from "../../service/project.service";
import {ProjectDTO} from "../../interfaces";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  projects!: ProjectDTO[];
  dataSource!: MatTableDataSource<ProjectDTO>;
  displayedColumns: string[] = ['name', 'link','address', 'square','client', 'admin', 'designer', 'made', 'status', 'actions'];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    if ( localStorage.getItem('role') === 'ADMIN'){
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
        this.dataSource = new MatTableDataSource(this.projects);
      }
    );}
    else {this.projectService.getAllProjects2().subscribe(
      (projects) => {
        this.projects = projects;
        this.dataSource = new MatTableDataSource(this.projects);
      }
    );}
  }

  StatusLink(projectId: number) {
    this.router.navigate( [`/status/${projectId}`]);
  }
  createProject(): void {
    this.router.navigate(['/project']);
  }
  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId).subscribe(
      () => {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
          this.projects.splice(index, 1);
          this.dataSource.data = this.projects;
        }
      }
    );
  }

}
