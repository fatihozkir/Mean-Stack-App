import { AutoLoginUser, LoginUser } from "./state/actions/auth.actions";
import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthUserState } from "./state/app.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(new AutoLoginUser());
  }
}
