import React, { FC } from 'react'
import s from './Card.module.css'

interface ICard {
  title: string
  sum: number;
  percent?: number;
  ticker?: string;
  type?: "basis" | "none"
}

const Card: FC<ICard> = ({ title, sum, percent, ticker, type }) => {
  return (
    <div className={s.card}>
      <p>{title}</p>
      <p className={s.ticker}>{ticker}</p>
      <p className={`${sum < 0 ? s.negative : s.positive} ${type === "basis" && s.type}`}>{sum.toFixed(2)}$</p>
      {percent && <p className={sum < 0 ? s.negative : s.positive}>{percent.toFixed(2)}%</p>}
    </div>
  )
}

export default Card