import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/signIn.dto';
import { AdminUser } from '../database/entities/admin-user.entity';
import { SignInResponseDto } from './dtos/signInResponse.dto';
import { SignUpDto } from './dtos/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<SignInResponseDto> {
    const user = await this.adminUsersRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: SignUpDto): Promise<{ success: boolean }> {
    const userExists = await this.adminUsersRepository.findOneBy({
      email: dto.email,
    });
    if (userExists) throw new UnauthorizedException('Usuário já cadastrado.');
    const user = this.adminUsersRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, await bcrypt.genSalt(10)),
    });
    await this.adminUsersRepository.save(user);
    return { success: true };
  }
}
