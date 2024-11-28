import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { UserBaseDto } from './user.dto';
import { CreateService } from './create/create.service';
import { EditService } from './edit/edit.service';
import { RemoveService } from './remove/remove.service';
import { RemoveUserDto } from './remove/remove.dto';
import { EditUserDto } from './edit/edit.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private createUserService: CreateService,
    private editUserService: EditService,
    private removeUserService: RemoveService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createUser(@Body() data: UserBaseDto) {
    return this.createUserService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put('edit')
  updateUser(@Body() data: EditUserDto) {
    return this.editUserService.edit(data);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(@Body() data: RemoveUserDto) {
    return this.removeUserService.remove(data);
  }
}
