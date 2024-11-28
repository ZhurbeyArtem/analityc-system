export interface IAnalyze {
  score: number;
  details: {
    roiScore: number;
    volatilityScore: number;
    diversificationScore: number;
    balanceScore: number;
  }
  issues: string[];
}