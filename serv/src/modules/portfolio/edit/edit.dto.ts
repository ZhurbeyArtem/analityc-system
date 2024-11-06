import { IsArray, IsOptional, IsString } from 'class-validator';
import { Dermache } from 'src/common/database/entities/dermache.entity';

export class EditPortfolioDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  dermaches?: Dermache[];
}
