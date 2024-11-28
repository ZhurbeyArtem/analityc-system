import { analyzePortfolio, getOnePortfolio } from '@/api/portfolio'
import { useInitializePortfolio, useSetPortfolio } from '@/hooks/setPortfolio'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import Card from '../card/Card'
import { findBestPerformer } from '@/util/findBestPerformer'
import s from './Portfolio.module.css'
import { findWorstPerformer } from '@/util/findWorstPerformer'
import Table from '../table/Table'
import { Button } from '@mui/material'
import { useBuySellDermacheForm } from '@/hooks/openDermacheBuySellForm'
import { BuySellType } from '@/enums/dermache.enum'
import { Chart } from "react-google-charts";
import { useAnalyze } from '@/hooks/setAnalyze'

const Portfolio = () => {
  useInitializePortfolio()
  const { portfolioId } = useSetPortfolio()
  const { data } = useQuery({
    queryFn: () => getOnePortfolio(portfolioId),
    queryKey: ['portfolio', portfolioId]

  })

  const { setOpen: setOpenAnalyze, setResult } = useAnalyze()
  const { mutate } = useMutation({
    mutationFn: () => analyzePortfolio(data!),
    onSuccess: (data) => {
      setOpenAnalyze(),
        setResult(data)
    }
  })

  const { setOpen, setType } = useBuySellDermacheForm()

  const bestPerformer = data && findBestPerformer(data.dermaches)
  const worstPerformer = data && findWorstPerformer(data.dermaches)
  const pieData = data?.dermaches?.map(dermache =>
    [dermache.ticker, dermache.buyPrice]
  )
  pieData?.unshift(['Розподіл', 'Акцій'])

  const charData = data?.dermachesHistory?.range.map((_, index) => [data?.dermachesHistory.range[index], data?.dermachesHistory.averages[index]])
  charData?.unshift(['Дата', 'Середня ціна'])

  const handleClickAdd = () => {
    setOpen()
    setType(BuySellType.buy)
  }

  return (
    <div className={s.portfolio}>
      <div className={s.header}>
        <h3 className={s.title}>{data?.currentPrice?.toFixed(2) || 0}$</h3>
        <div className={s.btns}>
          {data && data.dermaches.length > 0 && <Button variant='outlined' onClick={() => mutate()}>Аналіз портфелю</Button>}
          <Button variant='outlined' onClick={handleClickAdd}>Додати актив</Button>
        </div>
      </div>
      {data?.description && <div className={s.description}>{data.description}</div>}

      {data?.currentPrice &&
        <div className={s.charts}>
          <Chart
            chartType="LineChart"

            data={charData}
            options={
              {
                title: "Ціна портфелю",
                hAxis: {
                  textPosition: "none",
                },
                legend: { position: "none" },
              }
            }

          />
          <Chart
            chartType="PieChart"
            data={pieData}
            options={
              {
                title: "Розподіл",
                pieHole: 0.75,
                sliceVisibilityThreshold: 0.1,
                pieSliceText: "none"
              }
            }
          />
        </div>}

      <div className={s.list}>
        <Card title="Прибуток за весь час" sum={data?.profit || 0} percent={data?.profitPercent} />
        <Card title="Всього внесено" sum={data?.startPrice || 0} type='basis' />
        <Card title="Найбільше прибутку від" ticker={bestPerformer?.ticker} sum={bestPerformer?.profit || 0} percent={bestPerformer?.profitPercent} />
        <Card title="Найменше прибутку від" ticker={worstPerformer?.ticker} sum={worstPerformer?.profit || 0} percent={worstPerformer?.profitPercent} />
      </div>
      <h3>Активи</h3>
      {data && <Table arr={data.dermaches} />}
    </div>
  )
}

export default Portfolio