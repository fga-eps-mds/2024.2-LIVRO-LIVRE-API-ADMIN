import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { ListUsersQueryDto } from './dtos/listUsersQuery.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: ListUsersQueryDto): Promise<{
    items: User[];
    total: number;
  }> {
    const whereConditions = {};
    if (query.email) whereConditions['email'] = query.email;
    if (query.firstName) whereConditions['firstName'] = query.firstName;
    if (query.lastName) whereConditions['lastName'] = query.lastName;
    if (query.phone) whereConditions['phone'] = query.phone;

    const take = query.perPage || 10;
    const skip = query.page || 0;

    const [result, total] = await this.usersRepository.findAndCount({
      where: whereConditions,
      take: take,
      skip: skip,
      order: { createdAt: 'DESC' },
    });

    return {
      items: result,
      total,
    };
  }
}
