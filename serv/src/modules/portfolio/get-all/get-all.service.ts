import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async getAll(id: number): Promise<Portfolio[]> {
    try {
      return await this.portfolioRepository
        .createQueryBuilder('portfolio')
        .leftJoin('portfolio.user', 'user')
        .where('user.id = :id', { id })
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
