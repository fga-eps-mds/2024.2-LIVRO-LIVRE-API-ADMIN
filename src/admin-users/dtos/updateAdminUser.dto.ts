import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAdminUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  oldPassword?: string;
  newPassword?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
