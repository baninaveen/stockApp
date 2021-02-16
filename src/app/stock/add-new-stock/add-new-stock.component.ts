import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AddNewCompany } from 'src/app/store/actions';


@Component({
  selector: 'app-add-new-stock',
  templateUrl: './add-new-stock.component.html',
  styleUrls: ['./add-new-stock.component.css']
})
export class AddNewStockComponent implements OnInit {

  companyForm: FormGroup;
  loading: boolean;

  allStocks = []

  constructor(public dialogRef: MatDialogRef<AddNewStockComponent>,
    private _store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.createForm()
    this._store.pipe(select('stocks')).subscribe(res => {
      this.allStocks = res.allStocks
    });
  }

  addCompany() {
    const symbolVal = this.companyForm.get('symbol').value

    const findSymbole = this.allStocks.find(item => item.symbol == symbolVal)

    if(findSymbole) {
      this.companyForm.get('symbol').setErrors({already: true})
    } else {
      this._store.dispatch(new AddNewCompany(this.companyForm.value))
      this.dialogRef.close(true)
    }

  }

  private createForm() {
    this.companyForm = new FormGroup({
      company: new FormControl('', Validators.required),
      symbol: new FormControl('', Validators.required),
    });
  }

}
