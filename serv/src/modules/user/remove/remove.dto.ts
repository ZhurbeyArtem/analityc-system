import { IsEmail, IsNotEmpty } from 'class-validator';

export class removeUserDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;
}
