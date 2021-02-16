import { Action } from '@ngrx/store';

export enum ActionTypes {
  getStocks = 'getStocks',
  storeStocks = 'storeStocks',
  getStockById = 'getStockById',
  storeStockById = 'storeStockById',
  addNewCompany = 'addNewCompany',
  deleteCompanyById = 'deleteCompanyById'
}
export class GetStocks implements Action {
  readonly type = ActionTypes.getStocks;
}

export class GetStockById implements Action {
  readonly type = ActionTypes.getStockById;
  constructor(public id: any) { }
}

export class AddNewCompany implements Action {
  readonly type = ActionTypes.addNewCompany;
  constructor(public payload: any) { }
}

export class DeleteCompanyById implements Action {
  readonly type = ActionTypes.deleteCompanyById;
  constructor(public id: any) { }
}


export class StoreStocks implements Action {
  readonly type = ActionTypes.storeStocks;
  constructor(public payload: object) { }
}
export class StoreStockById implements Action {
  readonly type = ActionTypes.storeStockById;
  constructor(public payload: object) { }
}

export type stockActions =
 | StoreStocks | StoreStockById;
