import { AuthGuard } from "../utils/guards/auth.guard";
import { PostListComponent } from "../components/posts/post-list/post-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "../components/posts/post-create/post-create.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
    
  },
  {
    path: "create",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class PostsRoutingModule {}
