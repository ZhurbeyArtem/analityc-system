import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
  ) {}
}
