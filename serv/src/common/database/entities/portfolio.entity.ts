import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Dermache } from './dermache.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Min(4)
  title: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ default: 0 })
  @IsNumber()
  totalStartSum: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(() => Dermache, (dermache) => dermache.portfolio)
  dermaches: Dermache[];
}
