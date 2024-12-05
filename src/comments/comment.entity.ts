import { Post } from 'src/posts/posts.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  post_id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true })
  deleted_by_owner: boolean;
}
