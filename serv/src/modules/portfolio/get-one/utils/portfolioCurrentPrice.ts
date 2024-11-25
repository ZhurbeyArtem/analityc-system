import { IDermacheWithCurrentPrice } from "src/modules/dermache/interfaces/dermache.inerface";

export const portfolioCurrentPrice = (dermaches: IDermacheWithCurrentPrice[]) => {
  return dermaches.reduce((prevVal, currentVal) => currentVal.buyCount * currentVal.currentPrice + prevVal, 0) //теперішня  ціна  портфелю
}