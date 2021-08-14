import { PostListComponent } from "../components/posts/post-list/post-list.component";
import { NgModule } from "@angular/core";
import { PostCreateComponent } from "../components/posts/post-create/post-create.component";
import { PostService } from "../services/posts/posts.service";

import { BaseModule } from "./base.module";
import { PostsRoutingModule } from "../routers/posts-routing.module";
@NgModule({
  imports: [BaseModule, PostsRoutingModule],
  declarations: [PostCreateComponent, PostListComponent],
  providers: [PostService],
})
export class PostsModule {}
