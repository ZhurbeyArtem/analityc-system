'use client';
import { useDeleteForm } from '@/hooks/openDeleteForm'
import { Modal, Box, Button } from '@mui/material'
import React from 'react'
import s from './ConfirmDelete.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePortfolio } from '@/api/portfolio'
import { EDeleteFormState } from '@/enums/deleteForm.enum'
import { deleteDermache } from '@/api/dermache';



const ConfirmDelete = () => {
  const client = useQueryClient()

  const { isOpen, setOpen, type, id } = useDeleteForm()

  const { mutate: deletePortfolioFn } = useMutation({
    mutationFn: (id: number) => deletePortfolio(id),
    onSuccess: async (data) => {
      const { toast } = await import('react-toastify')
      client.invalidateQueries({ queryKey: ['portfolios'] })
      toast.success(data)
    }
  })
  const { mutate: deleteDermacheFn } = useMutation({
    mutationFn: (id: number) => deleteDermache(id),
    onSuccess: async (data) => {
      const { toast } = await import('react-toastify')
      client.invalidateQueries({ queryKey: ['portfolio'] })
      toast.success(data)
    }
  })

  const handleClick = () => {
    if (type === EDeleteFormState.portfolio) {
      deletePortfolioFn(id)
      setOpen()
    }
    else {
      deleteDermacheFn(id)
      setOpen()

    }
  }

  return (
    <Modal open={isOpen} onClose={() => setOpen()}>
      <Box className={s.box}>
        <h3 className={s.title}>Ви дійсно бажаєте видалити{type === EDeleteFormState.portfolio ? " портфоліо" : " акцію"}?</h3>

        <div className={s.list}>
          <Button type="button" variant="outlined" color="error" fullWidth className={s.submitBtn} onClick={setOpen}>
            Відмінити
          </Button>
          <Button type="button" variant="outlined" color="primary" fullWidth className={s.submitBtn} onClick={handleClick}>
            Підтвердити
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default ConfirmDelete