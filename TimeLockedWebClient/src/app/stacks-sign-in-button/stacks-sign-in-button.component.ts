import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: 'app-stacks-sign-in-button',
  template: `
    <button (click)="onSignIn.emit()">
      {{ loading ? "Loading" : "Sign in" }}
    </button>
  `,
})
export class StacksSignInButtonComponent {
  @Input() loading: boolean;
  @Output() onSignIn = new EventEmitter();
}
