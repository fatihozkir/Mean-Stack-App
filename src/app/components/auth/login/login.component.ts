import { LoginUser } from "./../../../state/actions/auth.actions";

import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthUserState } from "src/app/state/app.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @Select(AuthUserState.hasAuthError) hasAuthError$: Observable<boolean>;
  constructor(private store: Store) {}
  isLoading: boolean = false;
  loginForm: FormGroup;
  ngOnInit() {
    this.hasAuthError$.subscribe((data) => {
      if (data) {
        this.isLoading = false;
      }
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new LoginUser({ email, password }));
  }
}
