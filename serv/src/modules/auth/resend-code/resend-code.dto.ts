import { IsEmail, IsNotEmpty } from "class-validator";

export class ResendCodeDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;
}