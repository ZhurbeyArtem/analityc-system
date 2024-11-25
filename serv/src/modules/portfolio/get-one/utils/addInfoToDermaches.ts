import { Dermache } from "src/common/database/entities/dermache.entity";
import { IDermacheFromFF, IDermacheWithCurrentPrice } from "src/modules/dermache/interfaces/dermache.inerface";

//додаємо до нашої акції її теперішню ціну і профіт
export const addInfoToDermaches = (dermaches: Dermache[], dermachesWithCurrentPrice: IDermacheFromFF[]): IDermacheWithCurrentPrice[] => {
  const result = dermaches.map(ourDermache => {
    const matchedItem = dermachesWithCurrentPrice.find(item => item.c === ourDermache.ticker);
    const currentPrice = matchedItem?.ltp || 0;
    let profit
    let profitPercent
    if (ourDermache.sellPrice > 0) {
      profit = ourDermache.sellCount * ourDermache.sellPrice - ourDermache.buyCount * ourDermache.buyPrice
      profitPercent = ((ourDermache.sellPrice - ourDermache.buyPrice) / ourDermache.buyPrice) * 100
    }
    else {
      profit = ((matchedItem?.ltp ?? 0) * ourDermache.buyCount) - (ourDermache.buyPrice * ourDermache.buyCount)
      profitPercent = (((matchedItem?.ltp ?? 0 - ourDermache.buyPrice) / ourDermache.buyPrice) * 100)
    }
    return matchedItem
      ? { ...ourDermache, currentPrice: Math.round(currentPrice * 100) / 100, profit: Math.round(profit * 100) / 100, profitPercent: Math.round(profitPercent * 100) / 100 }
      : { ...ourDermache, currentPrice, profit: 0, profitPercent: 0 }; // на випадок якщо не знайдеться акція за таким тікером
  });
  return result
}