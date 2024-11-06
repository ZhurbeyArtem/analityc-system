import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class GetOneService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(
    email: string,
    type: 'create' | 'find' = 'find',
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user && type === 'find') {
        throw new HttpException('Користувач з таким email не знайдений', 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async findOneByRefreshToken(refreshToken: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { refreshToken, expiryTokenDate: MoreThanOrEqual(new Date()) },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
