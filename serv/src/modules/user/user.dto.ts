import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserBaseDto {
  @IsEmail({}, { message: 'Введіть коректний email' })
  @IsNotEmpty({ message: "Поле email обов'язкове" })
  email: string;

  @MinLength(8, {
    message: 'Мінімальна довжина паролю повинна бути не менш ніж 8 символів',
  })
  @IsNotEmpty({ message: "Поле пароль обов'язкове" })
  password: string;
}
