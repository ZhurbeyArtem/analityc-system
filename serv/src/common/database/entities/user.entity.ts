import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ default: false })
  @IsBoolean()
  isActivated: boolean;

  @Column()
  @IsNumber()
  code: number;

  @Column({ nullable: true })
  @IsString()
  accessToken: string;

  @Column({ nullable: true })
  @IsString()
  refreshToken: string;

  @Column({ nullable: true })
  @IsDate()
  expiryTokenDate: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
