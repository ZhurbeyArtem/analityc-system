import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { removeUserDto } from './remove.dto';

@Injectable()
export class RemoveService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async remove({ email }: removeUserDto): Promise<string> {
    try {
      await this.userRepository.delete(email);
      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}
