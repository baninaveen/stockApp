import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {AuthService} from '../../auth/services/auth.service'


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit,OnDestroy, AfterViewInit {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
constructor(private changeDetectorRef: ChangeDetectorRef,
  private _authService :AuthService,
  private media: MediaMatcher) {
  this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      // tslint:disable-next-line: deprecation
      this.mobileQuery.addListener(this._mobileQueryListener);
 }

ngOnInit(): void {
}
ngOnDestroy(): void {
  // tslint:disable-next-line: deprecation
  this.mobileQuery.removeListener(this._mobileQueryListener);
}

ngAfterViewInit(): void {
  this.changeDetectorRef.detectChanges();
}

logOut () {
  this._authService.logout()
}

}
