import { MaxLength } from 'class-validator';
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(100)
  name: string;

  @Column({ unique: true })
  @MaxLength(191)
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;
}
