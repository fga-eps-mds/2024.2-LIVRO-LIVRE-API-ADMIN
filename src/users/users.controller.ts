import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ListUsersQueryDto } from './dtos/listUsersQuery.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: ListUsersQueryDto) {
    return this.usersService.findAll(query);
  }
}
