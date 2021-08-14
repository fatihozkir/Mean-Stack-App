import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from './routers/auth-routing.module';
import { PostsModule } from "./modules/posts.module";
import { ErrorInterceptor } from "./utils/interceptors/error-interceptor";
import { AuthInterceptor } from "./utils/interceptors/auth-interceptor";
import { PostsRoutingModule } from "./routers/posts-routing.module";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { BaseModule } from "./modules/base.module";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./modules/material.module";
import { AuthModule } from "./modules/auth.module";
import { StateModule } from "./modules/state.module";
import { AppRoutingModule } from './routers/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseModule,
    PostsModule,
    StateModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
