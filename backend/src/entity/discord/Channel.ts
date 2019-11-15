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

@Entity("discord_channels")
@Unique(["name", "slug", "guid"])
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsUniq({ scope: ["name"] })
  @Length(3, 25)
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  @IsUniq({ scope: ["slug"] })
  slug: string;

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
