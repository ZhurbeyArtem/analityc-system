import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class EditUserDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;

  @MinLength(8, {
    message: 'Мінімальна довжина паролю повинна бути не менш ніж 8 символів',
  })
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActivated?: boolean;

  @IsNumber()
  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsDate()
  @IsOptional()
  expiryTokenDate?: Date;
}
