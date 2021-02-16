import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GetStockById } from '../../store/actions'

const ELEMENT_DATA: any[] = [
  { position: 1, open: 9, high: 10, low: 5, close: 7, volume: 8 },
  { position: 2, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 3, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 4, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 5, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 6, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 7, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 8, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 9, open: 9, high: 10, low: 5, close: 7, volume: 8  },
  { position: 10, open: 9, high: 10, low: 5, close: 7, volume: 8  },
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  _id: number = null
  stockPayload: object= {}
  displayedColumns: string[] = ['position', 'open', 'high','low','close', 'volume'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _store: Store<any>,
    private _route: ActivatedRoute,
  ) {
    this._id = this._route.snapshot.params.id;
    if(this._id) {
      this._store.dispatch(new GetStockById(this._id));
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this._store.pipe(select('stocks')).subscribe(res => {
      console.log("rowData ---> ", res.stockById);
      this.stockPayload = res.stockById
      // this.dataSource = res.allStocks
    });
  }

 
}
