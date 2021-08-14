import { Observable } from "rxjs";
import { mimeType } from "./../../../utils/validators/mime-type.validator";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Post } from "src/app/models/post.model";
import { PostService } from "src/app/services/posts/posts.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationPosition } from "src/app/utils/enums";
import { Select } from "@ngxs/store";
import { AuthUserState } from "src/app/state/app.state";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  //#region Variables
  postId: string;
  postForm: FormGroup;
  message: string;
  imagePreview: string;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  buttonText: string = "Close";
  //#endregion
  @Select(AuthUserState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(
    public postsService: PostService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((data) => {
      this.isLoading = false;
    });
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      content: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.isEditMode = true;
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((resData) => {
          this.isLoading = false;
          if (resData) {
            this.postForm.setValue({
              title: resData.post.title,
              content: resData.post.content,
              image: resData.post.imagePath,
            });
          }
        });
      }
    });
  }

  onAddPost() {
    if (!this.postForm.valid) return;
    const { title, content, image } = this.postForm.value;
    const post: Post = {
      id: null,
      title: title,
      content: content,
      image: image,
    };
    this.isLoading = true;
    if (this.isEditMode) {
      post.id = this.postId;
      this.postsService.updatePost(post);
      this.postForm.setValue({
        title: title,
        content: content,
        image: image,
      });
      this.message = "Post has been updated!";
    } else {
      this.postsService.addPost(post);
      this.message = "Post has been added!";
    }

    this._snackBar.open(this.message, this.buttonText, {
      horizontalPosition: NotificationPosition.Right,
      verticalPosition: NotificationPosition.Bottom,
      duration: 2 * 1000,
    });
    this.postForm.reset();
  
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }
}
