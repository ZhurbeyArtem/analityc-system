import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { GetOneDto } from './get-one.dto';

@Injectable()
export class GetOneService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

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

      return result;
    } catch (error) {
      throw error;
    }
  }
}
