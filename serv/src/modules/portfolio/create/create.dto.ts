import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/common/database/entities/user.entity';

export class CreatePortfolioDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  user?: User;
}
