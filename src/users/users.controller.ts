import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ListUsersQueryDto } from './dtos/listUsersQuery.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query() query: ListUsersQueryDto) {
    return this.usersService.findAll(query);
  }
}
