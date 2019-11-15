import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent
} from "typeorm";
import { Length } from "class-validator";
import { User } from "../User";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { Post } from "./Post";
import { PendingPost } from "./PendingPost";

@Entity("resources_categories")
@Tree("closure-table")
@Unique(["name", "slug"])
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(3, 255)
  @IsUniq({ scope: ["name"] })
  name: string;

  @Column()
  @IsUniq({ scope: ["slug"] })
  slug: string;

  @Column("text")
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @OneToMany(
    type => Post,
    post => post.category
  )
  posts: Post[];

  @OneToMany(
    type => PendingPost,
    pendingPost => pendingPost.category
  )
  pendingPosts: PendingPost[];

  @ManyToOne(
    type => User,
    user => user.categories
  )
  user: User;
}
