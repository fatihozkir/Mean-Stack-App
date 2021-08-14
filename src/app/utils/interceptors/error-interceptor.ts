import { ErrorOccurred } from './../../state/actions/auth.actions';
import { ErrorComponent } from "./../../components/error/error.component";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Store } from '@ngxs/store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private store:Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const res = next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Error Occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {
          data: {
            title: "Error Occurred",
            message: errorMessage,
          },
        });

        this.store.dispatch(new ErrorOccurred());
        return throwError(error);
      })
    );
    return res;
  }
}
