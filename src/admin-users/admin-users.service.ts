import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../database/entities/admin-user.entity';
import { UpdateAdminUserDto } from './dtos/updateAdminUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,
  ) {}

  findAll(): Promise<AdminUser[]> {
    return this.adminUsersRepository.find();
  }

  findOne(id: string): Promise<AdminUser | null> {
    return this.adminUsersRepository
      .createQueryBuilder()
      .where({ id })
      .getOne();
  }

  async update(id: string, updateData: UpdateAdminUserDto): Promise<AdminUser> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();

    user.firstName = updateData.firstName;
    user.lastName = updateData.lastName;
    user.email = updateData.email;

    if (updateData.newPassword && updateData.oldPassword) {
      if (!(await bcrypt.compare(updateData.oldPassword, user.password))) {
        throw new UnauthorizedException('Please check your login credentials');
      }
      user.password = await bcrypt.hash(
        updateData.newPassword,
        await bcrypt.genSalt(10),
      );
    }

    await this.adminUsersRepository.save(user);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.adminUsersRepository.delete(id);
  }
}
