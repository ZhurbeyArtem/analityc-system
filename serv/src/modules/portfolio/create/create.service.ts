import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './create.dto';
import { Portfolio } from 'src/common/database/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(data: CreatePortfolioDto): Promise<Portfolio> {
    try {
      return await this.portfolioRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
