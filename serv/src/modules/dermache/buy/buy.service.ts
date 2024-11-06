import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';
import { BuyDto } from './buy.dto';
import { GetOneService } from '../get-one/get-one.service';
import { GetOneService as GetOnePortfolioService } from '../../portfolio/get-one/get-one.service';
import { EditService } from '../edit/edit.service';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
    private getOneService: GetOneService,
    private editService: EditService,
    private getOnePortfolioService: GetOnePortfolioService,
  ) {}

  async buy(data: BuyDto, userId: number) {
    try {
      const dermache: Dermache = await this.getOneService.getOne(
        data.ticker,
        data.portfolio,
      );

      if (!dermache) {
        const portfolio = await this.getOnePortfolioService.getOne({
          id: Number(data.portfolio),
          type: 'edit',
        });
        if (portfolio.user.id !== userId) {
          throw new HttpException(
            'Ви не можете купувати акції для чужих портфелів',
            HttpStatus.FORBIDDEN,
          );
        }
        await this.dermacheRepository.save(data);
        return 'Ваша Акція успішно додана до портфелю';
      }

      const totalValue =
        dermache.buyPrice * dermache.buyCount + data.buyPrice * data.buyCount;
      const totalCount = dermache.buyCount + data.buyCount;
      const avgPrice = totalValue / totalCount;

      dermache.buyPrice = avgPrice;
      dermache.buyCount = totalCount;

      await this.editService.edit(dermache);
      return 'Ваша Акція успішно додана до портфелю';
    } catch (error) {
      throw error;
    }
  }
}
