import { Helpers } from "../utils/helpers/helpers";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth/auth.service";
import {
  AutoLoginUser,
  ErrorOccurred,
  LoginUser,
  LogoutUser,
  ResetError,
  SignupUser,
} from "./actions/auth.actions";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Auth } from "../models/auth.model";
import { tap } from "rxjs/operators";

export class AppStateModel {
  authUser: Auth;
  hasAuthError: boolean;
}

@State<AppStateModel>({
  name: "appState",
  defaults: {
    authUser: undefined,
    hasAuthError: undefined,
  },
})
@Injectable()
export class AuthUserState {
  private tokenTimer: any;
  constructor(private authService: AuthService, private router: Router) {}

  @Selector()
  static getCurrentUserId(state: AppStateModel): string {
    return state.authUser.id;
  }
  @Selector()
  static token(state: AppStateModel): string {
    return state.authUser.token;
  }

  @Selector()
  static isAuthenticated(state: AppStateModel): boolean {
    return !!state.authUser.token;
  }

  @Selector()
  static hasAuthError(state: AppStateModel): boolean {
    return !!state.hasAuthError;
  }
  @Action(ResetError)
  ResetError({ getState, patchState }: StateContext<AppStateModel>) {
    patchState({
      hasAuthError: undefined,
      ...getState,
    });
  }
  @Action(ErrorOccurred)
  ErrorOccurred({ getState, patchState }: StateContext<AppStateModel>) {
    patchState({
      hasAuthError: true,
      ...getState,
    });
  }

  @Action(SignupUser)
  SignupUser(
    { getState, patchState }: StateContext<AppStateModel>,
    { payload }: SignupUser
  ) {
    const { email, password } = payload;

    return this.authService.createUser(email, password).pipe(
      tap((result: { user: any; tokenExpiration: number }) => {
        if (result.user && result.user.token && result.user.token.length > 0) {
          const expirationTime = result.tokenExpiration * 1000;

          this.tokenTimer = setTimeout(() => {
            patchState({
              authUser: undefined,
              ...getState,
            });
            this.router.navigate(["/"]);
          }, expirationTime);

          const currentTimeStamp = new Date();
          const expirationDate = new Date(
            currentTimeStamp.getTime() + expirationTime
          );
          patchState({
            authUser: {
              id: result.user._id,
              email: email,
              token: result.user.token,
            },
          });

          Helpers.saveAuthData(
            result.user.id,
            email,
            result.user.token,
            expirationDate
          );

          this.router.navigate(["/"]);
        }
      })
    );
  }
  @Action(LoginUser)
  LoginUser(
    { getState, patchState }: StateContext<AppStateModel>,
    { payload }: LoginUser
  ) {
    const { email, password } = payload;
    return this.authService.loginUser(email, password).pipe(
      tap((result: { user: any; tokenExpiration: number }) => {
        if (result.user && result.user.token && result.user.token.length > 0) {
          const expirationTime = result.tokenExpiration * 1000;
          this.tokenTimer = setTimeout(() => {
            patchState({
              authUser: undefined,
              ...getState,
            });
            this.router.navigate(["/"]);
          }, expirationTime);

          patchState({
            authUser: {
              id: result.user._id,
              email: email,
              token: result.user.token,
            },
          });

          const currentTimeStamp = new Date();
          const expirationDate = new Date(
            currentTimeStamp.getTime() + expirationTime
          );
          Helpers.saveAuthData(
            result.user._id,
            email,
            result.user.token,
            expirationDate
          );
          this.router.navigate(["/"]);
        }
      })
    );
  }

  @Action(LogoutUser)
  LogoutUser({ patchState }: StateContext<AppStateModel>) {
    patchState({
      authUser: undefined,
      hasAuthError: undefined,
    });
    clearTimeout(this.tokenTimer);
    Helpers.clearAuthData();
    this.router.navigate(["/"]);
  }

  @Action(AutoLoginUser)
  AutoLoginUser({ getState, patchState }: StateContext<AppStateModel>) {
    const authInfo = Helpers.getAuthData();
    if (authInfo) {
      const currentDate = new Date();
      const expiresIn =
        authInfo.expirationDate.getTime() - currentDate.getTime();
      if (expiresIn > 0) {
        this.tokenTimer = setTimeout(() => {
          patchState({
            authUser: null,
            ...getState,
          });
          this.router.navigate(["/"]);
        }, expiresIn);
        patchState({
          authUser: {
            id: authInfo.userId,
            email: authInfo.email,
            token: authInfo.token,
          },
          ...getState,
        });
      }
    }
  }
}
