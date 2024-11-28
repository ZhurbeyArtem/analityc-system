import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermache } from 'src/common/database/entities/dermache.entity';
import { Repository } from 'typeorm';
import { SellDto } from './sell.dto';
import { GetOneService } from '../get-one/get-one.service';
import { EditService } from '../edit/edit.service';

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(Dermache)
    private dermacheRepository: Repository<Dermache>,
    private getOneService: GetOneService,
    private editService: EditService,
  ) { }

  async sell(data: SellDto, userId: number): Promise<string> {
    try {
      const dermache: Dermache = await this.getOneService.getOne(
        data.ticker,
        data.portfolio,
      );

      if (!dermache) {
        throw new HttpException(
          'Акції з такою назвой не існує',
          HttpStatus.NOT_FOUND,
        );
      }

      if (dermache.portfolio.user.id !== userId) {
        throw new HttpException(
          'Ви не можете продавати акції чужого портфелю',
          HttpStatus.FORBIDDEN,
        );
      }

      if (dermache.sellCount + data.sellCount > dermache.buyCount) {
        throw new HttpException(
          'Ви не можете продати більше акцій ніж маєте',
          HttpStatus.FORBIDDEN,
        );
      }

      const totalSellValue =
        dermache.sellPrice * dermache.sellCount +
        data.sellCount * data.sellPrice;
      const totalSellCount = dermache.sellCount + data.sellCount;
      const avgSellPrice = totalSellValue / totalSellCount;

      dermache.sellPrice = avgSellPrice;
      dermache.sellCount = totalSellCount;

      await this.editService.edit(dermache);
      return 'Ваша транзакція успішно додана';
    } catch (error) {
      throw error;
    }
  }
}
