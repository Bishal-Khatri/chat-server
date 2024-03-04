import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class GoogleLoginUserDto {
  @IsString()
  public sub: string;

  @IsString()
  public name: string;

  @IsString()
  public picture: string;

  @IsEmail()
  public email: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}
