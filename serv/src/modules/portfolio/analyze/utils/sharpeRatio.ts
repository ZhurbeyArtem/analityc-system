export const calculateSharpeRatio = (profitPercent: number, riskFreeRate: number, volatility: number) => {
  // Розрахунок коефіцієнта Шарпа
  return ((profitPercent / 100) - riskFreeRate) / volatility
}