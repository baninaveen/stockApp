import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StocksEffects } from '../app/store/effects';
import { StockReducer } from '../app/store/reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

import {AppRoutingModule} from './app.routing.module';
import { AuthGuard } from './authGuards/auth.guard';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './meterial-module';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(StockReducer, {}),
    EffectsModule.forRoot([StocksEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
