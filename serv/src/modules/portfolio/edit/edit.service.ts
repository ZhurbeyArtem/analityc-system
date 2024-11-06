import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { EditPortfolioDto } from './edit.dto';
import { GetOneService } from '../get-one/get-one.service';

@Injectable()
export class EditService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private getOneService: GetOneService,
  ) {}

  async edit(
    id: number,
    data: EditPortfolioDto,
    userId: number,
  ): Promise<Portfolio> {
    try {
      const portfolio = await this.getOneService.getOne({ id, type: 'edit' });

      if (portfolio.user.id !== userId)
        throw new HttpException(
          'Ви можете редагувати лише свої портфоліо',
          HttpStatus.NOT_ACCEPTABLE,
        );

      await this.portfolioRepository
        .createQueryBuilder('portfolio')
        .update(Portfolio)
        .set(data)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      const result = await this.getOneService.getOne({ id });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
