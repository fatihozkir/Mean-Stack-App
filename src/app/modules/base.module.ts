import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorComponent } from "../components/error/error.component";
import { HeaderComponent } from "../components/header/header.component";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [HeaderComponent, ErrorComponent],
  exports: [
    HeaderComponent,
    ErrorComponent,

    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  entryComponents: [ErrorComponent],
})
export class BaseModule {}
