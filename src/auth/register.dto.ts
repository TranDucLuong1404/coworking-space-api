import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username phải có ít nhất 3 ký tự' })
  @MaxLength(20, { message: 'Username không được quá 20 ký tự' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional() // Không bắt buộc phải có
  @IsString()
  role?: string = 'user'; // Mặc định là 'user'
}
