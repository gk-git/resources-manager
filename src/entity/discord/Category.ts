import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length } from "class-validator";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";

@Entity("discord_categories")
@Unique(["name", "slug", "guid"])
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(3, 25)
  @IsUniq({ scope: ["name"] })
  name: string;

  @Column("text")
  @IsUniq({ scope: ["slug"] })
  slug: string;

  @Column("text")
  description: string;

  @Column()
  @IsUniq({ scope: ["guid"] })
  guid: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
