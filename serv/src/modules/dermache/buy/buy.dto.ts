import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';

export class BuyDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  ticker: string;

  @IsNumber()
  buyPrice: number;

  @IsNumber()
  buyCount: number;

  @IsNumber()
  portfolio: Portfolio;
}
