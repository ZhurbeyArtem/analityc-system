import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
  ) {}

  async getOne(ticker: string, portfolioId: Portfolio): Promise<Dermache> {
    try {
      console.log('-*****');
      
      console.log(ticker);
      console.log(portfolioId);
      
      return await this.dermacheRepository
        .createQueryBuilder('dermache')
        .leftJoinAndSelect('dermache.portfolio', 'portfolio')
        .leftJoin('portfolio.user', 'user')
        .where('dermache.ticker = :ticker', { ticker })
        .andWhere('portfolio.id = :portfolioId', { portfolioId })
        .select(['dermache', 'portfolio', 'user.id'])
        .getOne();
    } catch (error) {
      console.log('+++++');
      
      console.log(error);
      
      throw error;
    }
  }
}
