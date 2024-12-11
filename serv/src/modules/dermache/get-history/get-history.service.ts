import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IGetHistory } from '../interfaces/get-history.interface';
@Injectable()
export class GetHistoryService {

  async getHistory({
    tickers,
    createdAt,
    dermaches }): Promise<IGetHistory> {

    const date = new Date()
    const body = {
      "q": {
        "cmd": "getHloc",
        "params": {
          "id": `${tickers}`,
          "count": -1,
          "timeframe": 1440,
          "date_from": `${createdAt}`,
          "date_to": `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} 00:00`,
          "intervalMode": "ClosedRay"
        }
      }
    }
    const { data: portfolioHistory } = await axios.post("https://tradernet.com/api/", body)

    const tickersArr = tickers.split(',')

    // hloc -  	Дані по свічці - назва тікера,масив масивів з 4 елементів в порядку: [high, low, open, close]
    const allValues = tickersArr.map(el => portfolioHistory.hloc[el].map((item) => {
      const dermache = dermaches.find(dermache => dermache.ticker === el)
      dermache.volatility = portfolioHistory.hloc[el].reduce((acc, cur) => acc + (cur[0] - cur[1]), 0) / portfolioHistory.hloc[el].length  // вираховуєм середню волативність активу
      return item[3] * dermache.buyCount - (dermaches.sellCount || 0)
    }))

    //середне значення всіх масивів
    const averages = allValues[0].map((_, index) => {
      const sum = allValues.reduce((acc, array) => acc + array[index], 0); // сумуєм значення на теперішньом індексі
      return sum
    });

    const range = this.getDatesInRange(createdAt, date)

    return { averages, range }
  }

  private getDatesInRange(startDate: string, endDate: Date): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: string[] = [];

    do {
      const dayOfWeek = start.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6)
        dates.push(start.toISOString().split('T')[0]); // Добавляєм дату в форматі "YYYY-MM-DD"
      start.setDate(start.getDate() + 1); // збільшуєм дату на 1 день
    } while (start <= end)

    return dates;
  }
}
