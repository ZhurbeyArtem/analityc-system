import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetOneDto {
  @IsNumber()
  id: number;

  @IsEnum(['delete', 'findOne'])
  @IsOptional()
  type?: 'delete' | 'findOne' | 'edit';
}
