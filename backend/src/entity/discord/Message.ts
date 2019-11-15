import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";

@Entity("discord_messages")
@Unique(["guid"])
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

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
