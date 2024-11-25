import { forwardRef, Module } from '@nestjs/common';
import { DermacheController } from './dermache.controller';
import { BuyService } from './buy/buy.service';
import { SellService } from './sell/sell.service';
import { EditService } from './edit/edit.service';
import { GetHistoryService } from './get-history/get-history.service';
import { GetOneService } from './get-one/get-one.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { DeleteService } from './delete/delete.service';

@Module({
  controllers: [DermacheController],
  providers: [
    BuyService,
    SellService,
    EditService,
    GetHistoryService,
    GetOneService,
    DeleteService,
  ],
  imports: [
    TypeOrmModule.forFeature([Dermache]),
    forwardRef(() => AuthModule),
    forwardRef(() => PortfolioModule),
  ],
  exports: [
    DeleteService,
    GetHistoryService
  ]
})
export class DermacheModule { }
