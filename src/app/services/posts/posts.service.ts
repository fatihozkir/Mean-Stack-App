import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "src/app/models/post.model";
import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts";
@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postUpdatedSubscripion = new Subject<{
    posts: Post[];
    totalAmount: number;
  }>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts(pageSize: number, pageIndex: number = 1) {
    const queryParams = `?pageSize=${pageSize}&pageIndex=${pageIndex}`;
    this.httpClient
      .get<{ posts: any; totalAmount: number }>(BACKEND_URL + queryParams)
      .pipe(
        map((resData) => {
          return {
            posts: resData.posts.map((post) => {
              return { ...post, id: post._id };
            }),
            totalAmount: resData.totalAmount,
          };
        })
      )
      .subscribe(
        (mappedData) => {
          this.posts = mappedData.posts;
          this.postUpdatedSubscripion.next({
            posts: [...this.posts],
            totalAmount: mappedData.totalAmount,
          });
        },
        (err) => {
        },
        () => {}
      );
  }

  getPostUpdateListener() {
    return this.postUpdatedSubscripion.asObservable();
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append("title", post.title);
    postData.append("content", post.content);
    postData.append("image", post.image, post.title);

    this.httpClient
      .post<{ post: any; message: string }>(BACKEND_URL, postData)
      .pipe(
        map((resData) => {
          return {
            ...resData.post,
            id: resData.post._id,
          };
        })
      )
      .subscribe(
        (mappedData) => {
          this.router.navigate(["/"]);
        },
        (err) => {
        },
        () => {
        }
      );
  }

  deletePost(id: string) {
    return this.httpClient.delete<{ message: string; post: any }>(
      `${BACKEND_URL}/${id}`
    );
  }

  getPost(id: string) {
    return this.httpClient.get<{ message: string; post: Post }>(
      `${BACKEND_URL}/` + id
    );
  }

  updatePost(post: Post) {
    let postData: Post | FormData;
    if (typeof post.image === "object") {
      postData = new FormData();
      postData.append("id", post.id);
      postData.append("title", post.title);
      postData.append("content", post.content);
      postData.append("image", post.image, post.title);
    } else {
      postData = {
        id: post.id,
        title: post.title,
        content: post.content,
        imagePath: post.imagePath,
      };
    }
    this.httpClient
      .patch(`${BACKEND_URL}/` + post.id, postData)
      .subscribe((resData: { message: string; post: Post }) => {
        this.router.navigate(["/"]);
      });
  }
}
