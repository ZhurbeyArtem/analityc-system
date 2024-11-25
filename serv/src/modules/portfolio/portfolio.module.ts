import { forwardRef, Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { CreateService } from './create/create.service';
import { EditService } from './edit/edit.service';
import { RemoveService } from './remove/remove.service';
import { GetAllService } from './get-all/get-all.service';
import { GetOneService } from './get-one/get-one.service';
import { AnalyzeService } from './analyze/analyze.service';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DermacheModule } from '../dermache/dermache.module';


@Module({
  controllers: [PortfolioController],
  providers: [
    CreateService,
    EditService,
    RemoveService,
    GetAllService,
    GetOneService,
    AnalyzeService,
  ],
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    forwardRef(() => AuthModule),
    forwardRef(() => DermacheModule)
  ],
  exports: [GetOneService],
})
export class PortfolioModule {}
