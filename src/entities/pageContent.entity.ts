import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Post } from "./post.entity";

@Entity("pageContent")
class PageContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (posts) => posts.pageContents)
  post: Post;

  @ManyToOne(() => Comment, (comments) => comments.pageContents)
  comments: Comment;
}

export { PageContent };