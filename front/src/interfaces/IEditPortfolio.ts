import { IPortfolio } from "./IPortfolio";

export interface IEditPortfolio extends Omit<IPortfolio, 'title'> {
  title?: string
}