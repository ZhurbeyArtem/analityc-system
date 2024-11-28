import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';
import { BuyDto } from './buy.dto';
import { GetOneService } from '../get-one/get-one.service';
import { GetOneService as GetOnePortfolioService } from '../../portfolio/get-one/get-one.service';
import { EditService } from '../edit/edit.service';
import axios from 'axios';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
    private getOneService: GetOneService,
    private editService: EditService,
    private getOnePortfolioService: GetOnePortfolioService,
  ) { }

  async buy(data: BuyDto, userId: number): Promise<string> {
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
        const body = {
          "q": {
            "cmd": "getSecurityInfo",
            "params": {
              "ticker": `${data.ticker}`,
              "sup": -1,
            }
          }
        }
        const { data: dermacheFF } = await axios.post('https://tradernet.com/api/', body)
        if (dermacheFF.code === 0) {
          throw new HttpException(
            'Нажаль такої акції не існує на нашому ринку',
            HttpStatus.BAD_REQUEST,
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
