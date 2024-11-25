import { Injectable } from '@nestjs/common';
import { totalROI } from './utils/totalRoi';
import { averageVolatility } from './utils/averageVolatility';
import { IPortfolio } from '../get-one/get-one.interface';

@Injectable()
export class AnalyzeService {
  analyze(portfolioData: IPortfolio) {
    let score = 0;
    const issues: string[] = [];

    const totalRoi = totalROI(portfolioData.dermaches)
    const roiScore = totalRoi > 20 ? 40 : totalRoi > 10 ? 20 : 0;
    if (roiScore === 0) issues.push("Низька прибутковість портфеля (ROI < 10%).");
    score += roiScore;

    const avgVolatility = averageVolatility(portfolioData.dermaches);
    const volatilityScore = avgVolatility < 10 ? 30 : avgVolatility < 20 ? 15 : 0;
    if (volatilityScore === 0) issues.push("Високий ризик через волатильність (> 20%).");
    score += volatilityScore;


    // Диверсифікація активів
    const isDiversified = portfolioData.dermaches.every(asset => asset.weight < 50);
    const diversificationScore = isDiversified ? 20 : 0;
    if (diversificationScore === 0) issues.push("Недостатня диверсифікація активів (один або більше активів ≥ 50% ваги).");
    score += diversificationScore;

    // Збалансованість портфеля
    const overweightAsset = portfolioData.dermaches.some(asset => asset.weight > 60);
    const balanceScore = overweightAsset ? -20 : 10;
    if (balanceScore < 0) issues.push("Один із активів займає понад 60% ваги портфеля.");
    score += balanceScore;

    score = Math.min(100, Math.max(0, score));

    return {
      score,
      details: {
        roiScore,
        volatilityScore,
        diversificationScore,
        balanceScore,
      },
      issues,
    };
  }
}
