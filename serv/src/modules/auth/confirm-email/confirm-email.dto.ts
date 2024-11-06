import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmEmailDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;

  @IsNotEmpty({ message: "Поле код обов'язкове" })
  @IsNumber()
  code: number;
}
