import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserBaseDto } from '../user.dto';
import { NotificationService } from 'src/modules/notification/notification.service';
import { generateCode } from '../user.utils';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private notificationService: NotificationService,
  ) {}

  async create(data: UserBaseDto): Promise<User> {
    try {
      const code = generateCode();

      await this.notificationService.sendEmail({
        email: data.email,
        code,
        title: 'Код для реєстрації в додатку',
      });

      return await this.userRepository.save({ ...data, code });
    } catch (error) {
      throw error;
    }
  }
}
