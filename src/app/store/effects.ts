import { Injectable } from '@angular/core';
import { Actions,createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { RequestService } from '../utils/request.service';
import * as stocksActions from './actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class StocksEffects {
  getAllStocks$ = createEffect(() => {
    return this.actions$.pipe(
        ofType<stocksActions.GetStocks>(
            stocksActions.ActionTypes.getStocks
        ),
        switchMap(() => {
          return this.requestService
            .request(
              {
                url: `/stocks`,
                method: 'get',
              }
            )
            .pipe(
              map(response => new stocksActions.StoreStocks(response))
            );
        })
      );
  });

  getStockById$ = createEffect(() => {
    return this.actions$.pipe(
        ofType<stocksActions.GetStockById>(
            stocksActions.ActionTypes.getStockById
        ),
        switchMap(({id}) => {
          return this.requestService
            .request(
              {
                url: `/stocks/${id}`,
                method: 'get',
              }
            )
            .pipe(
              map(response => new stocksActions.StoreStockById(response))
            );
        })
      );
  });
  
  addNewStock$ = createEffect(() => {
    return this.actions$.pipe(
    ofType<stocksActions.AddNewCompany>(
      stocksActions.ActionTypes
        .addNewCompany
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/stocks`,
            method: 'post',
            payload: action.payload,
          }
        )
        .pipe(
          map(response => {
            this.toastr.success('The company is successfully added')
            return new stocksActions.GetStocks()})
        )
    )
  );
})
  deleteStockById$ = createEffect(() => {
    return this.actions$.pipe(
    ofType<stocksActions.DeleteCompanyById>(
      stocksActions.ActionTypes
        .deleteCompanyById
    ),
    switchMap(({id}) =>
      this.requestService
        .request(
          {
            url: `/stocks/${id}`,
            method: 'delete',
          }
        )
        .pipe(
          map(response => {
            this.toastr.success('The company is successfully deleted')
            return this.router.navigate(['/']);
          })
        )
    )
  );
}, {dispatch:false})

  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private router: Router,
    private toastr: ToastrService
  ) { }
}
