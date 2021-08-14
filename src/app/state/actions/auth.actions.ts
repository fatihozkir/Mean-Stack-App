export class SignupUser {
  static readonly type = "[AUTH] Signup User";
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginUser {
  static readonly type = "[AUTH] Login User";
  constructor(public payload: { email: string; password: string }) {}
}
export class AutoLoginUser {
  static readonly type = "[AUTH] Auto Login User";
}
export class LogoutUser {
  static readonly type = "[AUTH] Logout User";
}

export class ErrorOccurred {
  static readonly type = "[AUTH] Error Occurred!";
}

export class ResetError{
  static readonly type = "[AUTH] Reset Error!";
}