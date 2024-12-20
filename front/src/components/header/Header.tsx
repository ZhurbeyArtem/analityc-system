"use client";

import { Button } from '@mui/material'
import React from 'react'
import s from './Header.module.css'
import { useAuthForm } from '@/hooks/openAuthForm';
import { useAuthUser, useInitializeAuthUser } from '@/hooks/setAuth';

const Header = () => {
  useInitializeAuthUser();
  const { setOpen } = useAuthForm();
  const { isAuth, setAuth, email, setEmail } = useAuthUser()

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false)
    setEmail('');
  };
  return (
    <>
      <div className={s.header}>
        <div className={s.content}>
          <p className={s.logo}>SA</p>
          {isAuth ?
            <div className={s.email}>
              <p className={s.emailText}>{email}</p>
              <Button variant="outlined" onClick={handleLogout}>Вийти</Button>
            </div>
            : <Button variant="outlined" onClick={setOpen}>Авторизуватись</Button>}
        </div>

      </div>
    </>

  )
}

export default Header