import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  public receiver_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
  public message: string;
}
