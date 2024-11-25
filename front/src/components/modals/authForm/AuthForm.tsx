"use client"
import { Box, Button, IconButton, InputAdornment, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import s from './AuthForm.module.css'
import { useAuthForm } from '@/hooks/openAuthForm';
import { useEmailForm } from '@/hooks/openEmailForm';
import { useMutation } from '@tanstack/react-query';
import { login, register as registerFn } from '@/api/auth';
import { IAuth } from '@/interfaces/IAuth';
import { toast } from 'react-toastify';
import { useConfirmForm } from '@/hooks/openConfirmForn';
import { useAuthUser } from '@/hooks/setAuth';


const AuthForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IAuth>();

  const { setOpen, isOpen } = useAuthForm()
  const { setOpen: setOpenEmailForm } = useEmailForm()
  const { setOpen: openConfirmForm } = useConfirmForm()
  const { setAuth, setEmail } = useAuthUser()

  const [signIn, setSignIn] = useState(true)

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('tokens', JSON.stringify(data));
      setAuth(true)
      setEmail(localStorage.getItem('email') || '')
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const { mutate: registerUser } = useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      openConfirmForm()
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const onSubmit = (data: IAuth) => {
    localStorage.setItem('email', data.email)
    if (signIn) {
      loginUser(data)
    }
    else {

      delete data.confirmPassword
      registerUser(data)
    }
    setOpen()
    reset()
  }

  const handleOpenEmailForm = () => {
    setOpen()
    setOpenEmailForm()
  }
  const password = watch("password");
  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen()}
    >
      <Box className={s.box}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          {
            signIn
              ? <h3 className={s.title}>Авторизація</h3>
              : <h3 className={s.title}>Реєстрація</h3>
          }
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

          <TextField
            size='small'
            label="Пароль"
            {...register("password", {
              required: 'Це поле обовязкове', minLength: {
                value: 8,
                message: 'Мінімальна кількість символів 8'
              }
            })}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors?.password && String(errors.password.message)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!signIn && <TextField
            size="small"
            label="Підтвердьте пароль"
            {...register("confirmPassword", {
              required: 'Це поле обов’язкове',
              validate: (value) => value === password || 'Паролі не співпадають',
            })}
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && String(errors.confirmPassword.message)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />}
          <Button type="submit" variant="contained" color="primary" fullWidth className={s.submitBtn}>
            {signIn ? 'Увійти' : 'Зареєструватися'}
          </Button>
          <div className={s.changeForm}>
            {
              signIn
                ? <p>Немає аккаунту? <span className={s.link} onClick={() => setSignIn(false)}>Зареєструватись</span></p>
                : <p>Вже маєте аккаунт? <span className={s.link} onClick={() => setSignIn(true)}>Авторизуватись</span></p>
            }
            <p className={s.link} onClick={handleOpenEmailForm}>Форма підтвердження пошти</p>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default AuthForm