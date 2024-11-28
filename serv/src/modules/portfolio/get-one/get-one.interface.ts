import { IDermacheWithCurrentPrice } from "src/modules/dermache/interfaces/dermache.inerface";

export interface IPortfolio{
  description?: string;
  currentPrice: number,
  profit: number,
  profitPercent: number,
  startPrice: number,
  dermaches: IDermacheWithCurrentPrice[],
  dermachesHistory: {
    averages: number[],
    range: string[]
  }
}