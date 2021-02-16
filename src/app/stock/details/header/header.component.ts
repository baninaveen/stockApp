import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { DeleteCompanyById } from 'src/app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input()
  stockPayload
  constructor(public dialog: MatDialog, private _store: Store<any>) { }

  ngOnChanges() {
    console.log('stock', this.stockPayload)
  }

  ngOnInit(): void {
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {...this.stockPayload}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result)
      if(result) {
        this._store.dispatch(new DeleteCompanyById(this.stockPayload.id))
      }
    });
  }

}
