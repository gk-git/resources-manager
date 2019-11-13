import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Length, IsNotEmpty, IsEmail, IsIn } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Post } from "./resources/Post";
import { Tag } from "./resources/Tag";
import { Log } from "./Log";
import { IsUniq } from "@join-com/typeorm-class-validator-is-uniq";
import { Category } from "./resources/Category";

@Entity("users")
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @Length(4, 20)
  @IsUniq({ scope: ["username"] })
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsEmail()
  @IsUniq({ scope: ["email"] })
  email: string;

  @Column()
  @IsIn(["ADMIN", "AUTHOR", "SUBSCRIBER", "EDITOR"])
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => Post,
    post => post.user
  )
  posts: Post[];

  @OneToMany(
    type => Category,
    category => category.user
  )
  categories: Category[];

  @OneToMany(
    type => Tag,
    tag => tag.user
  )
  tags: Tag[];

  @OneToMany(
    type => Log,
    log => log.user
  )
  logs: Log[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
