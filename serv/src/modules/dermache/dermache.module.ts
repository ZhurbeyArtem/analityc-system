import { forwardRef, Module } from '@nestjs/common';
import { DermacheController } from './dermache.controller';
import { BuyService } from './buy/buy.service';
import { SellService } from './sell/sell.service';
import { EditService } from './edit/edit.service';
import { GetAllService } from './get-all/get-all.service';
import { GetOneService } from './get-one/get-one.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  controllers: [DermacheController],
  providers: [
    BuyService,
    SellService,
    EditService,
    GetAllService,
    GetOneService,
  ],
  imports: [
    TypeOrmModule.forFeature([Dermache]),
    forwardRef(() => AuthModule),
    forwardRef(() => PortfolioModule),
  ],
})
export class DermacheModule {}
