import { Dermache } from "src/common/database/entities/dermache.entity";

// потрачена сума на портфель
export const countStartPrice = (dermaches: Dermache[]) => {
  return dermaches.reduce((prevVal, currentVal) => currentVal.buyCount * currentVal.buyPrice + prevVal, 0) 

}