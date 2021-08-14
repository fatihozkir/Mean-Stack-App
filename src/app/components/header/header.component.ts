import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthUserState } from "src/app/state/app.state";
import { LogoutUser } from "src/app/state/actions/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Select(AuthUserState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit() {}

  onLogout() {
    this.store.dispatch(new LogoutUser());
  }
}
//fatih.ozkir@gmail.com
