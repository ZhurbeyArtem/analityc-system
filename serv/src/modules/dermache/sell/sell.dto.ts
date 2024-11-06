import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';

export class SellDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  ticker: string;

  @IsNumber()
  sellPrice: number;

  @IsNumber()
  sellCount: number;

  @IsNumber()
  portfolio: Portfolio;
}
