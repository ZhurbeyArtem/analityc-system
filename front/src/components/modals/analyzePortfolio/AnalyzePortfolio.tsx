"use client"

import { Modal, Box, Button, List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import React from 'react'
import s from './AnalyzePortfolio.module.css'
import { useAnalyze } from '@/hooks/setAnalyze'

const AnalyzePortfolio = () => {
  const { isOpen, setOpen, result } = useAnalyze()

  return (
    <Modal open={isOpen} onClose={() => setOpen()}>
      <Box className={s.box}>
        <h3 className={s.title}>Аналіз портфелю</h3>
        <p>Загальна оцінка: {result?.score}</p>
        <List
          subheader={<ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Ваші оцінки по портфелю:</ListSubheader>}>
          <ListItem disableGutters>
            <ListItemText
              primary={`ROI - ${result?.details.roiScore}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={`Диверифікація - ${result?.details.diversificationScore}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={`Збалансованість - ${result?.details.balanceScore}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={`Волативність - ${result?.details.roiScore}`}
            />
          </ListItem>
        </List>

        {result?.issues && result?.issues.length > 0 &&
          <div>
            <h4>Рішення для покращення портфелю</h4>
            {result?.issues.map(issue => <p>{issue}</p>)}
          </div>
        }
        <div>
          <List
            subheader={<ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Критерії оцінювання:</ListSubheader>}>
            <li>
              <ul>
                <li>
                  <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Roi:</ListSubheader>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`ROI > 20%: 40 балів`}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`ROI 10%-20%: 20 балів`}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`ROI < 10%: 0 балів`}
                    />
                  </ListItem>
                </li>
                <li>
                  <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Волативність:</ListSubheader>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Середня волатильність < 10%: низький ризик (30 балів)`}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Волатильність 10–20%: середній ризик (15 балів)`}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Волатильність > 20%: високий ризик (0 балів)`}
                    />
                  </ListItem>
                </li>
                <li>
                  <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Диверсифікація:</ListSubheader>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Усі активи < 50% ваги (жоден актив не має більше ніж 50% суми від усього портфелю): 20 балів.`}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Один чи кілька активів ≥ 50% ваги: 0 балів.`}
                    />
                  </ListItem>
                </li>
                <li>
                  <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Збалансованість:</ListSubheader>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={`Один актив займає > 60% ваги: -20 балів.`}
                    />
                  </ListItem>
                </li>
              </ul>
            </li>

           
          </List>
        </div>
      </Box>
    </Modal>
  )
}

export default AnalyzePortfolio