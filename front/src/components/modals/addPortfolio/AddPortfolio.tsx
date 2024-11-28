
import { usePortfolioForm } from '@/hooks/openPortfolioForm';
import { IPortfolio } from '@/interfaces/IPortfolio';
import { Modal, Box, TextField, Button } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';

import s from './AddPortfolio.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPortfolio, editPortfolio } from '@/api/portfolio';
import { toast } from 'react-toastify';

const AddPortfolio = () => {
  const client = useQueryClient()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IPortfolio>();
  const { isOpen, setOpen, data: portfolio, type, setData } = usePortfolioForm()
  const { mutate: create } = useMutation({
    mutationFn: (data: IPortfolio) => createPortfolio(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['portfolios'] })
      toast.success("Портфель успішно створено")
    }
  })
  const { mutate: edit } = useMutation({
    mutationFn: (data: IPortfolio) => editPortfolio(data),
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ['portfolio', data.id] })
      client.invalidateQueries({ queryKey: ['portfolios'] })
      setData(data)
      toast.success("Портфель успішно відредактовано")
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })
  const onSubmit = (data: IPortfolio) => {
    if (type === 'create') {
      create(data)

    } else {
      edit({ id: portfolio.id, title: data.title, description: data.description })
    }
    setOpen()
    reset()
  }

  const handleClose = () => {
    reset()

    setOpen()
  }
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box className={s.box}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size='small'
            label="Назва*"
            variant="outlined"
            defaultValue={portfolio.title}
            type="text"
            {...register("title", {
              required: 'Це поле обовязкове'
            })}
            error={!!errors.title}
            helperText={errors?.title && String(errors.title.message)}
            fullWidth
          />

          <TextField
            size='small'
            label="Опис"
            variant="outlined"
            defaultValue={portfolio.description}
            type='text'
            fullWidth
            {...register("description")}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={s.submitBtn}>
            {type === 'create' ? "Створити портфель" : 'Оновити портфель'}
          </Button>

        </form>
      </Box>
    </Modal>
  )
}

export default AddPortfolio