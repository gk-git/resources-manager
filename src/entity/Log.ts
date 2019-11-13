import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Post } from './resources/Post';
import { Tag } from './resources/Tag';
import { Category } from './resources/Category';
import { User } from './User';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  sql_command: string;

  @Column('text')
  type: string;

  @Column('text')
  action: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.logs)
  user: User;
}
