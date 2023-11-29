import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../../interfaces";
import {UserService} from "../../service/user.service";
import {StatusService} from "../../service/status.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {
  currentUser!: UserDTO;
  userForm!: FormGroup;
  mean: number = 0;
  constructor(private userService: UserService, private fb: FormBuilder, private statusService: StatusService) {
    this.userService.getMe().subscribe(user => {
    this.currentUser = user;
    this.userForm = this.fb.group({
      name: [user.name, Validators.required],
    });
  });
    this.statusService.getArithmeticMean().subscribe(mean => {
      this.mean = mean;
    });
  }

  updateUser(): void {
    const updatedName = this.userForm.get('name')?.value;
    this.userService.updateUser(updatedName).subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });
  }

  deleteUser(): void {
    this.userService.deleteUser().subscribe(() => {

    });
  }
}
