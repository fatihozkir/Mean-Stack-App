import { Statics } from "../statics";

export class Helpers {
  public static saveAuthData(
    id:string,
    email: string,
    token: string,
    expirationDate: Date
  ) {
    localStorage.setItem(Statics.LocalStorage_UserId_Key, id);
    localStorage.setItem(Statics.LocalStorage_Email_Key, email);
    localStorage.setItem(Statics.LocalStorage_Token_Key, token);
    localStorage.setItem(
      Statics.LocalStorage_Expiration_Key,
      expirationDate.toISOString()
    );
  }
  public static clearAuthData() {
    localStorage.removeItem(Statics.LocalStorage_UserId_Key);
    localStorage.removeItem(Statics.LocalStorage_Email_Key);
    localStorage.removeItem(Statics.LocalStorage_Token_Key);
    localStorage.removeItem(Statics.LocalStorage_Expiration_Key);
  }

  public static getAuthData() {
    const userId = localStorage.getItem(Statics.LocalStorage_UserId_Key);
    const email = localStorage.getItem(Statics.LocalStorage_Email_Key);
    const token = localStorage.getItem(Statics.LocalStorage_Token_Key);
    const expirationDate = localStorage.getItem(
      Statics.LocalStorage_Expiration_Key
    );
    if (!token || !expirationDate) {
      return;
    }
    return {
      userId:userId,
      token: token,
      email: email,
      expirationDate: new Date(expirationDate),
    };
  }
}
