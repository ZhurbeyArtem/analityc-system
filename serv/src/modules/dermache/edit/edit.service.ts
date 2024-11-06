import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EditService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
  ) {}

  async edit(data: Dermache) {
    try {
      return await this.dermacheRepository
        .createQueryBuilder('dermache')
        .update(Dermache)
        .set(data)
        .where('dermache.id = :id', { id: data.id })
        .execute();
    } catch (error) {
      throw error;
    }
  }
}
