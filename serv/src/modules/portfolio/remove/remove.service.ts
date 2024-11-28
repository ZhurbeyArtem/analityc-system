import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetOneService } from '../get-one/get-one.service';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteService } from 'src/modules/dermache/delete/delete.service';

@Injectable()
export class RemoveService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private getOneService: GetOneService,
    private dermacheDeleteService: DeleteService
  ) {}

  async delete(id: number, userId: number):Promise<string> {
    try {
      const portfolio = await this.getOneService.getOne({ id, type: 'delete' });
      if (portfolio.user.id !== userId)
        throw new HttpException(
          'Ви можете видаляти лише свої записи',
          HttpStatus.FORBIDDEN,
        );
      await this.dermacheDeleteService.delete(id)
      await this.portfolioRepository.delete(id);
      return 'Успішно';
    } catch (error) {
      throw error;
    }
  }
}
