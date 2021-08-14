import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path:'',
    loadChildren:"../modules/posts.module#PostsModule"
  },
  {
    path: "auth",
    loadChildren:"../modules/auth.module#AuthModule"
    // loadChildren: () =>
    //   import("../modules/auth.module").then((m) => m.AuthModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
