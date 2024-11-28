"use client"
import { useBuySellDermacheForm } from '@/hooks/openDermacheBuySellForm'
import { useInitializePortfolio, useSetPortfolio } from '@/hooks/setPortfolio'
import { Modal, Box, TextField, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import s from './BuySellDermacheForm.module.css'
import { BuySellType } from '@/enums/dermache.enum'
import { buy, sell } from '@/api/dermache'
import { ISellDermache } from '@/interfaces/ISellDermache'
import { IBuyDermache } from '@/interfaces/IBuyDermache'
import { toast } from 'react-toastify';

interface IBuySellDermache {
  ticker?: string;
  buyPrice?: number;
  buyCount?: number;
  portfolio: number;
  sellPrice?: number;
  sellCount?: number;
}

const BuySellDermacheForm = () => {
  useInitializePortfolio()
  const client = useQueryClient()
  const { portfolioId } = useSetPortfolio()

  const { isOpen, setOpen, type, ticker } = useBuySellDermacheForm()
  const { register, handleSubmit, formState: { errors }, reset, unregister } = useForm<IBuySellDermache>();

  const { mutate: sellDermache } = useMutation({
    mutationFn: (data: ISellDermache) => sell(data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['portfolio'] })
      toast.success(`${data}`)
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const { mutate: buyDermache } = useMutation({
    mutationFn: (data: IBuyDermache) => buy(data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['portfolio'] })
      toast.success(`${data}`)
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  useEffect(() => {
    if (type === BuySellType.buy) {
      unregister("sellPrice");
      unregister("sellCount");
    } else if (type === BuySellType.sell) {
      unregister("buyPrice");
      unregister("ticker");
      unregister("buyCount");
    }
  }, [type, unregister]);

  const onSubmit = (data: IBuySellDermache) => {
    if (type === BuySellType.buy) {
      const { buyPrice, buyCount, ticker: formTicker } = data
      buyDermache({
        buyPrice: Number(buyPrice!), buyCount: Number(buyCount!), ticker: formTicker!, portfolio: portfolioId
      })
    }
    else {
      const { sellPrice, sellCount } = data
      sellDermache({
        sellPrice: Number(sellPrice!), sellCount: Number(sellCount!), ticker, portfolio: portfolioId
      })
    }
    reset()
    setOpen()
  }


  return (
    <Modal
      open={isOpen}
      onClose={setOpen}
    >
      <Box className={s.box}>
        <form className={s.form}
          onSubmit={handleSubmit(onSubmit)}>

          {type === BuySellType.buy && (
            <>
              <TextField
                size='small'
                label="Тікер*"
                variant="outlined"
                type="text"
                {...register("ticker", {
                  required: 'Це поле обовязкове'
                })}
                error={!!errors.ticker}
                helperText={errors?.ticker && String(errors.ticker.message)}
                fullWidth
              />
              <TextField
                size="small"
                label="Ціна купівлі*"
                variant="outlined"
                {...register("buyPrice", {
                  required: 'Це поле обов\'язкове', min: {
                    value: 0,
                    message: 'Мінімальна ціна купівлі повина бути > 0'
                  } })}
                error={!!errors.buyPrice}
                helperText={errors?.buyPrice?.message}
                fullWidth
              />
              <TextField
                size="small"
                label="Кількість купівлі*"
                variant="outlined"
                type="number"
                {...register("buyCount", {
                  required: 'Це поле обов\'язкове', min: {
                    value: 0,
                    message: 'Мінімальна кількість повина бути > 0'
                  }
})}
                error={!!errors.buyCount}
                helperText={errors?.buyCount?.message}
                fullWidth
              />
            </>
          )}

          {type === BuySellType.sell && (
            <>
              <TextField
                size="small"
                label="Ціна продажу*"
                variant="outlined"
                type="number"
                {...register("sellPrice", {
                  required: 'Це поле обов\'язкове', min: {
                    value: 0,
                    message: 'Мінімальна ціна продажу повина бути > 0'
                } })}
                error={!!errors.sellPrice}
                helperText={errors?.sellPrice?.message}
                fullWidth
              />
              <TextField
                size="small"
                label="Кількість продажу*"
                variant="outlined"
                type="number"
                {...register("sellCount", { required: 'Це поле обов\'язкове',  min: {
                value: 0,
                    message: 'Мінімальна кількість повина бути > 0'
                } })}
                error={!!errors.sellCount}
                helperText={errors?.sellCount?.message}
                fullWidth
              />
            </>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth className={s.submitBtn}>
            {type === BuySellType.sell ? "Продати" : 'Купити'}
          </Button>

        </form>
      </Box>
    </Modal >
  )
}

export default BuySellDermacheForm