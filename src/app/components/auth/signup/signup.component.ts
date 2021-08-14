import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SignupUser } from "src/app/state/actions/auth.actions";
import { AuthUserState } from "src/app/state/app.state";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  @Select(AuthUserState.hasAuthError) hasAuthError$: Observable<boolean>;
  signupForm: FormGroup;
  isLoading = false;
  constructor(private store: Store) {}

  ngOnInit() {
    this.hasAuthError$.subscribe((data) => {
      if (data) {
        this.isLoading = false;
      }
    });
    this.signupForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSignup() {
    if (!this.signupForm.valid) return;
    this.isLoading = true;
    const { email, password } = this.signupForm.value;
    this.store.dispatch(new SignupUser({ email, password }));
  }
}
