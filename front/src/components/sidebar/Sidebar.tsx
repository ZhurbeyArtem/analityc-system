"use client"
import { deletePortfolio, getPortfolios } from '@/api/portfolio'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import s from './Sidebar.module.css'
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { IPortfolio } from '@/interfaces/IPortfolio'
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetPortfolio } from '@/hooks/setPortfolio';
import AddPortfolio from '../modals/addPortfolio/AddPortfolio';
import { usePortfolioForm } from '@/hooks/openPortfolioForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Sidebar = () => {
  const client = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['portfolios'],
    queryFn: getPortfolios,
  })
  const { mutate: deletePortfolioFn } = useMutation({
    mutationFn: (id: number) => deletePortfolio(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ['portfolios'] })
  })
  const { setPortfolio } = useSetPortfolio()
  const { setOpen, setData, setType } = usePortfolioForm()
  const router = useRouter()
  const searchParams = useSearchParams()


  useEffect(() => {
    const id = searchParams.get('id')

    if (id === null && data?.length > 0) {
      router.push(`?id=${data[0].id}`)
      setPortfolio(data[0].id)
    }
  }, [data, router, searchParams, setPortfolio])

  const handleChange = (id: number) => {
    router.push(`?id=${id}`)
    setPortfolio(id)
  }
  const handleEditClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, portfolio: IPortfolio) => {
    event.stopPropagation();
    setData(portfolio)
    setOpen()
    setType('edit')
  };
  return (
    isLoading
      ? <p>loading...</p>
      : <div className={s.sidebar}>
        <p className={s.title}>Мої портфелі</p>
        <Button className={s.btn} onClick={setOpen}>
          <AddIcon />Створити портфель
        </Button>
        <List className={s.list}>
          {data?.map((item: IPortfolio) =>
            <ListItem disablePadding key={item.id} >
              <ListItemButton className={s.item} onClick={() => handleChange(item.id)}>
                <ListItemText primary={item.title} />

                <EditIcon onClick={(e) => handleEditClick(e, item)} />
                <DeleteIcon onClick={() => deletePortfolioFn(item.id)} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <AddPortfolio />
      </div>
  )
}

export default Sidebar