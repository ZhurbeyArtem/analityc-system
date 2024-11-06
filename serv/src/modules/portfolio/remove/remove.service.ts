import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetOneService } from '../get-one/get-one.service';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RemoveService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private getOneService: GetOneService,
  ) {}

  async delete(id: number, userId: number) {
    try {
      const portfolio = await this.getOneService.getOne({ id, type: 'delete' });
      if (portfolio.user.id !== userId)
        throw new HttpException(
          'Ви можете видаляти лише свої записи',
          HttpStatus.FORBIDDEN,
        );
      await this.portfolioRepository.delete(id);
      return 'Успішно';
    } catch (error) {
      throw error;
    }
  }
}
