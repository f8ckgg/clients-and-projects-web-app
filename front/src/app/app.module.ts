import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";

import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {JwtInterceptor} from "./component/JwtInterceptor";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {UserComponent} from "./component/user/user.component";
import { ClientsComponent } from './component/clients/clients.component';
import { ClientComponent } from './component/client/client.component';
import { ProjectTableComponent } from './component/project-table/project-table.component';
import { ProjectComponent } from './component/project/project.component';
import {CreateBillComponent} from "./component/create-bill/create-bill.component";
import {BillsComponent} from "./component/bills/bills.component";
import { StatusComponent } from './component/status/status.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user',component:UserComponent},
  {path:'clients',component:ClientsComponent},
  {path:'client',component:ClientComponent},
  {path:'client/:id',component:ClientComponent},
  {path:'projects',component:ProjectTableComponent},
  {path:'project',component:ProjectComponent},
  {path:'createbill/:id',component:CreateBillComponent},
  {path:'bills',component:BillsComponent},
  {path:'status/:projectId',component:StatusComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ClientsComponent,
    ClientComponent,
    ProjectTableComponent,
    ProjectComponent,
    CreateBillComponent,
    BillsComponent,
    StatusComponent
  ],
  imports: [
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule, MatMenuModule,
    MatDialogModule, MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
