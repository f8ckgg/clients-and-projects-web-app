import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {Observable} from "rxjs";
import {StatusDTO} from "../../interfaces";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  projectId: number =0;
  statuses: StatusDTO[] = [];
  displayedColumns: string[] = ['status', 'date'];
  lastStatus: string | undefined;

  constructor(private route: ActivatedRoute, private statusService: StatusService,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.statusService
      .getAllStatuses(this.projectId)
      .subscribe((statuses) => {
        this.statuses = statuses;
        this.lastStatus = this.statuses[this.statuses.length - 1].status;
      });
  }
    //   this.statusService.getLastStatusByProjectId(this.projectId).subscribe(status => {
 //     this.lastStatus = status;
 //   });


  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  isUser(): boolean {
    return localStorage.getItem('role') === 'USER';
  }

  isDesignerConfirmed(): boolean {
    return this.lastStatus === 'DESIGNER_CONFIRMED';
  }

  isCreatedOrDisapproved(): boolean {
  return this.lastStatus === 'ADMIN_CREATED' || this.lastStatus === 'ADMIN_DISAPPROVED';
  }

  onAdminApproved(): void {
    this.statusService.createAdminApprovedStatus(this.projectId).subscribe(() => {
      this.projectService.setProjectMade(this.projectId).subscribe();
      this.router.navigate(['createbill',this.projectId]);
    });
  }

  onAdminDisapproved(): void {
    this.statusService.createAdminDisapprovedStatus(this.projectId).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }

  onCreateDesignerConfirmed(): void {
    this.statusService.createDesignerConfirmedStatus(this.projectId).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }
}
