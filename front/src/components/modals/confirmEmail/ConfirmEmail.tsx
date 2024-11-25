'use client'

import { useConfirmForm } from '@/hooks/openConfirmForn';
import { Modal, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react'

import s from './ConfirmEmail.module.css'
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { confirmEmail } from '@/api/auth';

const ConfirmEmail = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const { setOpen, isOpen } = useConfirmForm()

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-input-${index + 1}`)?.focus();
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: confirmEmail,
    onSuccess: () => {
      toast.success(`Ваш аккаунт успішно активовано`)
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  const handleSubmit = () => {
    const email = localStorage.getItem('email') || ""
    mutate({ code: Number(code.join('')), email })
    setOpen()
    setCode(["", "", "", ""])
  }
  return (
    <Modal open={isOpen} onClose={() => setOpen()}>
      <Box className={s.box}>
        <h3 className={s.title}>Підтвердження пошти</h3>
        <div className={s.list}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              id={`code-input-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              variant="outlined"
              size="small"
              inputProps={{
                style: { textAlign: 'center', fontSize: '32px', fontWeight: 700 }
              }}
            />
          ))}
        </div>
        <Button type="button" variant="contained" color="primary" fullWidth className={s.submitBtn} onClick={handleSubmit}>
          Підтвердити
        </Button>
      </Box>
    </Modal>
  );

}

export default ConfirmEmail