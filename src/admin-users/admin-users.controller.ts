import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { UpdateAdminUserDto } from './dtos/updateAdminUser.dto';

@Controller('admin-users')
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}

  @Get()
  findAll() {
    return this.adminUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUsersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAdminUserDto) {
    return this.adminUsersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUsersService.remove(id);
  }
}
