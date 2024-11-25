import { Dermache } from "src/common/database/entities/dermache.entity";

export interface IDermacheWithCurrentPrice extends Dermache{
  currentPrice: number;
  profitPercent: number;
  profit: number;
  weight?: number;
  volatility?: number;
}

export interface IDermacheFromFF {  // інтерфейс відповіді фрідом фінанс
  c: string; // назва тікера
  ltp: number; // ціна останьой продажі
}

