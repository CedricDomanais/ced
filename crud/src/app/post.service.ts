import { EventEmitter, Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http:HttpClient){}
  listChangedEvent: EventEmitter<Post[]> = new EventEmitter();
  listOfPosts: Post[] = [
    /*
      new Post("TechCrunch",
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/12/techcrunch-website-homepage-1024x542.webp",
        "TechCrunch is a blog that provides technology and startup news, from the latest developments in Silicon Valley to venture capital funding.",
        "Johnny ",
        new Date,
        9
      */
  ];
  getPost() {
    return this.listOfPosts;
  }
  deleteButton(index: number) {
    this.http.delete(`https://crud-5b63b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`).subscribe(() => {
      console.log('Post deleted from Firebase');
      this.listOfPosts.splice(index, 1);
    });
  }
  addPost(post: Post) {
    this.listOfPosts.push(post);
    
  }
  updatePost(index: number, post: Post) {
    this.listOfPosts[index] = post;
  }
  getSpecPost(index: number) {
    return this.listOfPosts[index];
  }
  likePost(index: number, userId: string) {
    const post = this.listOfPosts[index];
  const userIndex = post.likeByUsers.indexOf(userId);

  if (userIndex === -1) {
    // User has not liked the post yet, so add their like
    post.numberOfLikes++;
    post.likeByUsers.push(userId);
  } else {
    // User has already liked the post, so remove their like
    post.numberOfLikes--;
    post.likeByUsers.splice(userIndex, 1);
  }

    
    this.http.put(`https://crud-5b63b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, this.listOfPosts[index])
      .subscribe(() => {
        console.log('Post updated in Firebase');
      });
  
  
  }
  addComment(index: number, comment: string) {
    this.listOfPosts[index].comments.push(comment);
    this.http.patch(`https://crud-5b63b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${index}.json`, { comments: this.listOfPosts[index].comments })
      .subscribe(() => {
        console.log('Comment added to Firebase');
      });
  }
  getComments(index: number) {
    
    return this.listOfPosts[index].comments;
  }
  setPosts(listOfPosts: Post[]) {
    this.listOfPosts = listOfPosts;
    this.listChangedEvent.emit(listOfPosts);
  }
  deleteComment(postIndex: number, commentIndex: number) {
    this.listOfPosts[postIndex].comments.splice(commentIndex, 1);
    this.http.patch(`https://crud-5b63b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${postIndex}.json`, { comments: this.listOfPosts[postIndex].comments })
      .subscribe(() => {
        console.log('Comment deleted from Firebase');
      });
}
getPosts() {
  const storedPosts = localStorage.getItem('listOfPosts');
  if (storedPosts) {
    this.listOfPosts = JSON.parse(storedPosts);
  } else {
}
}
}

