import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "../User";
import { Length, IsUrl, MinLength } from "class-validator";
import { Tag } from "./Tag";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { Category } from "./Category";

@Entity("resources_posts")
@Unique(["title", "slug"])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 255)
  @IsUniq()
  title: string;

  @Column()
  @IsUniq({ scope: ["slug"] })
  slug: string;

  @Column("text")
  @MinLength(10)
  description: string;

  @Column("text")
  @IsUrl()
  url: string;

  @Column({
    default: true
  })
  isAvailable: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.posts
  )
  user: User;

  @ManyToOne(
    type => Category,
    category => category.posts
  )
  category: Category;

  @ManyToMany(
    type => Tag,
    tag => tag.posts
  )
  @JoinTable()
  tags: Tag[];
}
