import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

import { User } from 'src/common/database/entities/user.entity';

export const generateToken = (data: User, jwtService: JwtService) => {
  const payload = {
    email: data.email,
    id: data.id,
    isActivated: data.isActivated,
  };
  const refreshToken = uuidv4();
  const expiryTokenDate = new Date();
  expiryTokenDate.setDate(expiryTokenDate.getDate() + 3);
  return {
    accessToken: jwtService.sign(payload),
    refreshToken: refreshToken,
    expiryTokenDate,
  };
};
