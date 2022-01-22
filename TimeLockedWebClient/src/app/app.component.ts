import { Component } from "@angular/core";
import { AuthOptions, FinishedAuthData } from "@stacks/connect";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-root",
  template: `
  <app-stacks-sign-in-button
  *ngIf="!(authResponse$ | async)"
  (onSignIn)="stacksAuth$.next()"
  [loading]="isLoadingConnect$ | async"
></app-stacks-sign-in-button>
  `,
})
export class AppComponent {
  stacksAuth$ = new Subject<void>();
  authResponse$ = new ReplaySubject<FinishedAuthData>(1);
  isLoadingConnect$ = new BehaviorSubject(false);

  authOptions: AuthOptions = {
    onFinish : (response) => this.authResponse$.next(response),
    appDetails: {
      name: "Angular Stacks Connect Demo",
      icon: "http://placekitten.com/g/100/100",
    },
  };

  ngOnInit() {
    this.stacksAuth$
    .pipe(
      tap(() => this.isLoadingConnect$.next(true)),
      switchMap(() => import("@stacks/connect")),
      tap(() => this.isLoadingConnect$.next(false))
    )
    .subscribe(connectLibrary =>
      connectLibrary.showBlockstackConnect(this.authOptions)
    );
  }
}