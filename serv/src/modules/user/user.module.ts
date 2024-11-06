import { forwardRef, Module } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { EditService } from './edit/edit.service';
import { RemoveService } from './remove/remove.service';
import { UserController } from './user.controller';
import { User } from 'src/common/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetOneService } from './get-one/get-one.service';
import { NotificationModule } from '../notification/notification.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CreateService, EditService, RemoveService, GetOneService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    NotificationModule,
    forwardRef(() => AuthModule),
  ],
  exports: [CreateService, EditService, RemoveService, GetOneService],
})
export class UserModule {}
