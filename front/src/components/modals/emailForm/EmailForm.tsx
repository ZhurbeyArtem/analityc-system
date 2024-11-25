"use client"
import React from 'react'
import s from './EmailForm.module.css'
import { useEmailForm } from '@/hooks/openEmailForm';
import { useForm } from 'react-hook-form';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useConfirmForm } from '@/hooks/openConfirmForn';
import { useMutation } from '@tanstack/react-query';
import { sendCode } from '@/api/auth';
import { toast } from 'react-toastify';

const EmailForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm <{ email: string } >();

  const { setOpen, isOpen } = useEmailForm()
  const { setOpen: openConfirmForm } = useConfirmForm()

  const { mutate } = useMutation({
    mutationFn: sendCode,
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const onSubmit = (data: { email: string }) => {
    mutate(data)
    setOpen()
    openConfirmForm()
    reset()
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen()}

    >
      <Box className={s.box}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

          <h3 className={s.title}>Підтвердження пошти</h3>

          <TextField
            size='small'
            label="Email"
            variant="outlined"
            type="email"
            {...register("email", {
              required: 'Це поле обовязкове',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Некоректний формат email',
              },
            })}
            error={!!errors.email}
            helperText={errors?.email && String(errors.email.message)}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className={s.submitBtn}>
            Відправити код на пошту
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default EmailForm