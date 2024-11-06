import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePortfolioDto } from './create/create.dto';
import { CreateService } from './create/create.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetAllService } from './get-all/get-all.service';
import { GetOneService } from './get-one/get-one.service';
import { RemoveService } from './remove/remove.service';
import { EditService } from './edit/edit.service';
import { EditPortfolioDto } from './edit/edit.dto';

@UseGuards(AuthGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(
    private createService: CreateService,
    private getAllService: GetAllService,
    private getOneService: GetOneService,
    private deleteService: RemoveService,
    private editService: EditService,
  ) {}

  @Post('create')
  create(@Body() data: CreatePortfolioDto, @Req() req) {
    const userId = req.user.id;
    return this.createService.create({ ...data, user: userId });
  }

  @Get('')
  getAll(@Req() req) {
    const userId = req.user.id;
    return this.getAllService.getAll(userId);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.getOneService.getOne({ id: id });
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.id;
    return this.deleteService.delete(id, userId);
  }

  @Put('/:id')
  edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditPortfolioDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.editService.edit(id, data, userId);
  }
}
