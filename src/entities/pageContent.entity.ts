import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";

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
