import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { GetOneDto } from './get-one.dto';
import { countStartPrice } from './utils/startPrice';
import { countCurrentPrice } from './utils/dermachesCurrentPrice';
import { addInfoToDermaches } from './utils/addInfoToDermaches';
import { portfolioCurrentPrice } from './utils/portfolioCurrentPrice';
import { GetHistoryService } from 'src/modules/dermache/get-history/get-history.service';
import { IPortfolio } from './get-one.interface';

@Injectable()
export class GetOneService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private dermacheGetHistory: GetHistoryService
  ) { }

  async getOne({ id, type = 'findOne' }: GetOneDto): Promise<Portfolio> {
    try {
      const portfolio = this.portfolioRepository
        .createQueryBuilder('portfolio')
        .leftJoinAndSelect('portfolio.dermaches', 'dermaches')
        .where('portfolio.id = :id', { id });

      if (type === 'delete' || type === 'edit') {
        portfolio
          .leftJoin('portfolio.user', 'user')
          .select(['portfolio', 'dermaches', 'user.id']);
      }

      const result = await portfolio.getOne();

      if (!result)
        throw new HttpException(
          'Портфоліо з таким id не існує',
          HttpStatus.NOT_FOUND,
        );

      return result
    } catch (error) {
      throw error;
    }
  }

  async getOneWithData(portfolio: Portfolio): Promise<IPortfolio> {
    try {
     
      const startPrice = countStartPrice(portfolio.dermaches)
      const dermachesWithCurrentPrice = await countCurrentPrice(portfolio.dermaches)
      const dermaches = addInfoToDermaches(portfolio.dermaches, dermachesWithCurrentPrice)
      const currentPrice = portfolioCurrentPrice(dermaches)

      //добавляєм вагу активу (скільки % займає в портфелі)
      dermaches.forEach(dermache => {
        dermache.weight = (((dermache.buyCount - dermache.sellCount || 0) * dermache.currentPrice) / currentPrice) * 100
      })

      const profit = currentPrice - startPrice;
      const profitPercent = ((currentPrice - startPrice) / startPrice) * 100;

      const dermachesHistory = await this.dermacheGetHistory.getHistory({
        tickers: dermaches.map((dermache) => dermache.ticker).join(','),
        createdAt: portfolio.createdAt,
        dermaches: dermaches
      })


      return {
        currentPrice,
        profit,
        profitPercent,
        startPrice,
        dermaches,
        dermachesHistory
      };
    }
    catch (error) {
      throw error
    }
  }

}
