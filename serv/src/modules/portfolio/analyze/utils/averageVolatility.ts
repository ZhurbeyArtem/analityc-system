import { IDermacheWithCurrentPrice } from "src/modules/dermache/interfaces/dermache.inerface";

export const averageVolatility = (dermaches: IDermacheWithCurrentPrice[]) => {
  return dermaches.reduce((sum, asset) => {
    return sum + asset.volatility * (asset.weight / 100);
  }, 0);
}