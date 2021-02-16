import * as stockActions from './actions';

export interface stockState {
  allStocks: object;
  stockById: object;
}

export const initialStockState: stockState = {
  allStocks: null,
  stockById: null,
};

export function stockReducer(
  state = initialStockState,
  action: stockActions.stockActions
): stockState {
  switch (action.type) {
    case stockActions.ActionTypes.storeStocks: {
      return {
        ...state,
        allStocks: action.payload,
      };
    }
    case stockActions.ActionTypes.storeStockById: {
      return {
        ...state,
        stockById: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

  
  export const StockReducer = {
    stocks: stockReducer,
  };

  
  
  
  
  