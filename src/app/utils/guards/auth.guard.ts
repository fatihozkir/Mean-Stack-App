import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthUserState } from "src/app/state/app.state";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.store.selectSnapshot(
      AuthUserState.isAuthenticated
    );
    
    if (!isAuthenticated) {
      this.router.navigate(["/auth/login"]);
    }
    return true;
  }
}
