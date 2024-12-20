import { Injectable } from '@nestjs/common';
import { totalROI } from './utils/totalRoi';
import { averageVolatility } from './utils/averageVolatility';
import { IPortfolio } from '../get-one/get-one.interface';
import { IAnalyze } from './analyze.interface';

import { calculateSharpeRatio } from './utils/sharpeRatio';

@Injectable()
export class AnalyzeService {
  analyze(portfolioData: IPortfolio): IAnalyze {

    let score = 0;
    const issues: string[] = [];

    //підрахунок роі
    const totalRoi = totalROI(portfolioData.dermaches)
    const roiScore = totalRoi > 20 ? 40 : totalRoi > 10 ? 20 : 0;
    if (roiScore === 0) issues.push("Низька прибутковість портфеля (ROI < 10%).\nДекілька порад які можуть покращити стан:\nОцініть поточний склад портфеля: Перегляньте активи, які мають найменший вклад у прибутковість.\nВизначте слабкі місця: Це можуть бути активи з низькою віддачею або високою волатильністю, яка не компенсується прибутковістю.\nПерегляньте розподіл ваги активів: Один актив може займати занадто велику частку, що впливає на загальний результат.");
    score += roiScore;

    //Волативність
    const avgVolatility = averageVolatility(portfolioData.dermaches);
    const volatilityScore = avgVolatility < 10 ? 30 : avgVolatility < 20 ? 15 : 0;
    if (volatilityScore === 0) issues.push("Високий ризик через волатильність (> 20%).\nДекілька порад які можуть покращити стан:\nЗменшіть частку активів із високою волатильністю, якщо їхній внесок у загальний дохід невеликий\nДодайте інструменти хеджування, такі як опціони, ф'ючерси чи золото, які можуть захистити ваш портфель від значних коливань.\nЗбалансуйте активи, наприклад, 60% портфеля можуть складати надійні активи, а 40% — ризикові");
    score += volatilityScore;

    // Коефіцієнт шарпа 
    // 0.035 це безризикова ставка в $ на данний момент
    const sharpeRatio = calculateSharpeRatio(portfolioData.profitPercent, 0.035, avgVolatility)
    const sharpeScore = sharpeRatio > 1 ? 10 : sharpeRatio > 0.5 ? 5 : 0;
    if (sharpeScore === 0) issues.push('Ваш портфель приносить недостатньо дохідності для компенсування ризику.\nЩо слід зробити:\nРозгляньте можливість використання стратегій хеджування, щоб зменшити потенційні втрати на фоні коливань ринку.\nПерегляньте стратегію інвестування. Можливо, потрібно змінити розподіл активів або переглянути вибір конкретних інструментів.')
    score += sharpeScore

    // Диверсифікація активів
    const isDiversified = portfolioData.dermaches.every(asset => asset.weight < 50);
    const diversificationScore = isDiversified ? 10 : 0;
    if (diversificationScore === 0) issues.push("Недостатня диверсифікація активів (один або більше активів ≥ 50% ваги).\nЩо слід зробити:\n Проведіть ребалансування: перевірте співвідношення активів і відкорегуйте його.Максимальна частка одного активу у портфелі не повинна перевищувати 10–20%.\nДодайте активи з різних секторів (технології, медицина, енергетика, сільське господарство тощо).\nВикористовуйте біржові фонди(ETF), вони дозволяють інвестувати у широкий спектр активів з низькими витратами. Це знижує концентрацію в окремих позиціях.");
    score += diversificationScore;

    // Збалансованість портфеля
    const overweightAsset = portfolioData.dermaches.some(asset => asset.weight > 60);
    const balanceScore = overweightAsset ? -20 : 10;
    if (balanceScore < 0) issues.push("Один із активів займає понад 60% ваги портфеля.\nПоради які допоможуть покращити стан:\nПроаналізуйте активи, які мають найбільшу вагу у портфелі.\nЗменште частку активу(-ів), що перевищують 50%, за рахунок продажу частини цього активу.");
    score += balanceScore;

    score = Math.min(100, Math.max(0, score));

    return {
      score,
      details: {
        roiScore,
        volatilityScore,
        diversificationScore,
        balanceScore,
        sharpeScore
      },
      issues,
    };
  }
}
