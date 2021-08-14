import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "src/app/models/auth-data.model";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl;
@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  createUser(email: string, password: string): Observable<any> {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    return this.httpClient.post(`${BACKEND_URL}/signup`, authData);
  }

  loginUser(email: string, password: string): Observable<any> {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    return this.httpClient.post(`${BACKEND_URL}/login`, authData);
  }
}
