import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Portfolio } from './portfolio.entity';

@Entity()
export class Dermache {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  ticker: string;

  @Column({ type: 'float' })
  @IsNumber()
  buyPrice: number;

  @Column()
  @IsNumber()
  buyCount: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  sellCount?: number;

  @Column({ nullable: true, type: 'float' })
  @IsNumber()
  @IsOptional()
  sellPrice?: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.dermaches)
  portfolio: Portfolio;
}
