import axios from "axios";
import { Dermache } from "src/common/database/entities/dermache.entity";
import { IDermacheFromFF } from "src/modules/dermache/interfaces/dermache.inerface";

//отримання теперішньой ціни акцій які в портфелю
export const countCurrentPrice = async (dermaches: Dermache[]): Promise<IDermacheFromFF[]> => {
  const tickers = dermaches.map((dermache) => dermache.ticker).join('+')
  const params = "ltp+c";
  const { data } = await axios.get(`https://freedom24.com/securities/export?tickers=${tickers}&params=${params}`) 
  return data
}
