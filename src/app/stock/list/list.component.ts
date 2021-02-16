import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { GetStocks } from '../../store/actions'
import { AddNewStockComponent } from '../add-new-stock/add-new-stock.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'company', 'symbol'];
  dataSource = [];

  constructor(
    private _store: Store<any>,
    public dialog: MatDialog
  ) { 
    this._store.dispatch(new GetStocks());
  }

  ngOnInit() {
    this._store.pipe(select('stocks')).subscribe(res => {
      console.log("rowData ---> ", res.allStocks);
      this.dataSource = res.allStocks
    });

  }

  addSymbol(): void {
    const dialogRef = this.dialog.open(AddNewStockComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }


}
