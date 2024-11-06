import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EditUserDto } from './edit.dto';

@Injectable()
export class EditService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async edit(data: EditUserDto): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(data)
        .where('email = :email', { email: data.email })
        .returning('*')
        .execute();
      return user.raw[0];
    } catch (error) {
      throw error;
    }
  }
}
