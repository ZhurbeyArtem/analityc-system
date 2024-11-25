import { IDermacheWithCurrentPrice } from "src/modules/dermache/interfaces/dermache.inerface";

export const totalROI = (dermaches: IDermacheWithCurrentPrice[]) => {
  const result = dermaches.reduce((sum, dermache) => {
    const roi = ((dermache.currentPrice - dermache.buyPrice) / dermache.buyPrice) * 100;
    return sum + roi * (dermache.weight / 100);
  }, 0);

  return result
}