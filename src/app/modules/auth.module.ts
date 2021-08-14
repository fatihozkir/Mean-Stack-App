import { BaseModule } from "./base.module";
import { AuthService } from "./../services/auth/auth.service";
import { NgModule } from "@angular/core";
import { LoginComponent } from "../components/auth/login/login.component";
import { SignupComponent } from "../components/auth/signup/signup.component";
import { AuthRoutingModule } from "../routers/auth-routing.module";

@NgModule({
  imports: [BaseModule, AuthRoutingModule],
  exports: [],
  declarations: [SignupComponent, LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
