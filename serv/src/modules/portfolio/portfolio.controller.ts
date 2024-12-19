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
import { IPortfolio } from './get-one/get-one.interface';
import { AnalyzeService } from './analyze/analyze.service';

@UseGuards(AuthGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(
    private createService: CreateService,
    private getAllService: GetAllService,
    private getOneService: GetOneService,
    private deleteService: RemoveService,
    private editService: EditService,
    private analyzeService: AnalyzeService
  ) { }

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
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const portfolio = await this.getOneService.getOne({ id: id })
    if (portfolio.dermaches.length < 1) return portfolio

    return this.getOneService.getOneWithData(portfolio);
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

  @Post('/analyze')
  analyze(
    @Body() data: IPortfolio
  ) {
    return this.analyzeService.analyze(data)
  }
}
