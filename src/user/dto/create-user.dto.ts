import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Entity } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(14)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accept english and number combined.',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @IsEmail()
  email: string;
}
