import { IDermache } from "@/interfaces/IDermache";

export const findWorstPerformer = (arr: IDermache[] ) => {
  return arr.reduce((max, item) => (item.profitPercent < max.profitPercent ? item : max), arr[0]);
}