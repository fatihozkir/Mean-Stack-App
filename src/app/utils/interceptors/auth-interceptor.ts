import { ResetError } from "./../../state/actions/auth.actions";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { AuthUserState } from "../../state/app.state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(new ResetError());
    const token = this.store.selectSnapshot<string>(AuthUserState.token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(req);
  }
}
