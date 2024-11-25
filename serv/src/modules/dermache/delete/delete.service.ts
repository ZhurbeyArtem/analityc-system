import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
  ) { }

  async delete(id: number) {
    try {
      await this.dermacheRepository
        .createQueryBuilder('dermache')
        .leftJoin('dermache.portfolio', 'portfolio')
        .delete()
        .where('portfolio.id = :id', { id })
        .execute();
      return 'Успішно'
    } catch (error) {
      throw error
    }
  }
}
