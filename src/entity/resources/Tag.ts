import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne
} from "typeorm";
import { Length } from "class-validator";
import { Post } from "../resources/Post";
import { User } from "../User";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";

@Entity("resources_tags")
@Unique(["name", "slug"])
export class Tag {
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

  @ManyToMany(
    type => Post,
    post => post.tags
  )
  posts: Post[];

  @ManyToOne(
    type => User,
    user => user.tags
  )
  user: User;
}
