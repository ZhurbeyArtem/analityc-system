import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { BuyService } from './buy/buy.service';
import { BuyDto } from './buy/buy.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SellService } from './sell/sell.service';
import { SellDto } from './sell/sell.dto';
import { DeleteService } from './delete/delete.service';

@UseGuards(AuthGuard)
@Controller('dermache')
export class DermacheController {
  constructor(
    private buyService: BuyService,
    private sellService: SellService,
    private deleteService: DeleteService
  ) { }

  @Post('/buy')
  buy(@Body() data: BuyDto, @Req() req) {
    const userId = req.user.id;
    return this.buyService.buy(data, userId);
  }

  @Post('/sell')
  sell(@Body() data: SellDto, @Req() req) {
    const userId = req.user.id;
    return this.sellService.sell(data, userId);
  }

  @Delete(':id')
  deleteDermache(@Param('id', ParseIntPipe) id: number) {
    return this.deleteService.delete(id);
  }
}
