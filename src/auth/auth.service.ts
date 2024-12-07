import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/signIn.dto';
import { AdminUser } from '../database/entities/admin-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.adminUsersRepository.findOneBy({ email });
    if (!user)
      throw new UnauthorizedException('Please check your login credentials');
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Please check your login credentials');
    return {
      accessToken: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
