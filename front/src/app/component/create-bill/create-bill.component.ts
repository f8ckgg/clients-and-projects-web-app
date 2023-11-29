import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {BillDTO} from "../../interfaces";
import {BillService} from "../../service/bill.service";

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent{
  billForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private billService: BillService,
  ) {
    this.billForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.min(0)]],
      project: {id: Number(this.route.snapshot.paramMap.get('id'))}
  });}


  createBill(): void {
    const bill :BillDTO = this.billForm.value;
    this.billService.createBill(bill).subscribe(() => {
      this.router.navigate(['/bills']);
    });
  }

}
