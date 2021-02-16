import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Module
import {MaterialModule} from '../meterial-module';

import { StockRoutingModule } from './stock-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './details/header/header.component';
import { AddNewStockComponent } from './add-new-stock/add-new-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, DetailsComponent, HeaderComponent, AddNewStockComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    MaterialModule
  ]
})
export class StockModule { }
