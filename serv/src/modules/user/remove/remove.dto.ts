import { IsEmail, IsNotEmpty } from 'class-validator';

export class RemoveUserDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;
}
