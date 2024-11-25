import { IDermache } from "./IDermache";


export interface IGetOnePortfolio {
  dermaches: IDermache[],
  currentPrice: number,
  profit: number,
  profitPercent: number,
  startPrice: number,
  dermachesHistory: {
    averages: number[],
    range: string[]
  }
}