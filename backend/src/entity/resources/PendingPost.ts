import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Length, IsUrl, MinLength, IsOptional } from "class-validator";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { Category } from "./Category";

@Entity("resources_pending_posts")
@Unique(["title"])
export class PendingPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  @IsOptional()
  @Length(3, 255)
  @IsUniq()
  title: string;

  @Column("text")
  @IsOptional()
  @MinLength(10)
  description: string;

  @Column("text")
  @IsUrl()
  @IsUniq({ scope: ["url"] })
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
    type => Category,
    category => category.pendingPosts
  )
  category: Category;
}
