import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NotificationDto {
  @IsString({ message: 'Введіть коректний заговолок' })
  @IsNotEmpty({ message: "Поле title обов'язкове" })
  title: string;

  @IsNumber({}, { message: 'Введіть коректний код має бути число з 4х чисел' })
  @IsNotEmpty({ message: "Поле code обов'язкове" })
  code: number;

  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;
}