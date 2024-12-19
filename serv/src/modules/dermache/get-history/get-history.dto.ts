import { IDermacheWithCurrentPrice } from "../interfaces/dermache.inerface";

export class IGetHistoryDto {
  tickers: string;
  createdAt: Date;
  dermaches: IDermacheWithCurrentPrice[]
}