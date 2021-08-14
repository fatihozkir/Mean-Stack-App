import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Post } from "src/app/models/post.model";
import { Observable, Subscription } from "rxjs";
import { PostService } from "src/app/services/posts/posts.service";
import { MatSnackBar, PageEvent } from "@angular/material";
import { NotificationPosition } from "src/app/utils/enums";
import { Select } from "@ngxs/store";
import { AuthUserState } from "src/app/state/app.state";
import { Statics } from "src/app/utils/statics";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  @Select(AuthUserState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AuthUserState.getCurrentUserId) currentUserId$: Observable<string>;
  private postsSub: Subscription;
  posts = [];
  isLoading = false;
  currentPageIndex = 1;
  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = Statics.Page_Size_Options;

  constructor(
    public postsService: PostService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);
    this.isLoading = true;
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; totalAmount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.totalAmount;
      });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
  deletePost(postId) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      (resData) => {
        this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);
      },
      () => {
        this.isLoading = false;
      }
    );

    this._snackBar.open("Post has been deleted!", "Close", {
      horizontalPosition: NotificationPosition.Right,
      verticalPosition: NotificationPosition.Bottom,
      duration: 2 * 1000,
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPageIndex = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPageIndex);
  }
}
