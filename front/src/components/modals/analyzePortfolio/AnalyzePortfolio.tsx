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
              primary={`Коефіцієнт Шарпа - ${result?.details.sharpeScore}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={`Волативність - ${result?.details.volatilityScore}`}
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

        </List>

        {result?.issues && result?.issues.length > 0 &&
          <div>
            <h4>Рішення для покращення портфелю:</h4>
            {result?.issues.map(issue =>
              <div key={issue}>
                {issue.split('\n').map((line, index) => <div key={index}>
                  <br />
                  {
                    index === 0
                      ? <p><b>{line}</b></p>
                      : <p>{line}</p>
                  }
                </div>)}
              </div>)}
          </div>
        }
        <div>
          <List subheader={<ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Критерії оцінювання:</ListSubheader>}>
            <div>
              <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Roi:</ListSubheader>
              <ul>
                <ListItem disableGutters>
                  <ListItemText primary={`ROI > 20%: 40 балів`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`ROI 10%-20%: 20 балів`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`ROI < 10%: 0 балів`} />
                </ListItem>
              </ul>
            </div>
            <div>
              <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Коефіцієнт Шарпа:</ListSubheader>
              <ul>
                <ListItem disableGutters>
                  <ListItemText primary={`Коефіцієнт Шарпа > 1: 10 балів`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Коефіцієнт Шарпа > 0.5: 5 балів`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Коефіцієнт Шарпа < 0.5: 0 балів`} />
                </ListItem>
              </ul>
            </div>
            <div>
              <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Волативність:</ListSubheader>
              <ul>
                <ListItem disableGutters>
                  <ListItemText primary={`Середня волатильність < 10%: низький ризик (30 балів)`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Волатильність 10–20%: середній ризик (15 балів)`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Волатильність > 20%: високий ризик (0 балів)`} />
                </ListItem>
              </ul>
            </div>
            <div>
              <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Диверсифікація:</ListSubheader>
              <ul>
                <ListItem disableGutters>
                  <ListItemText primary={`Усі активи < 50% ваги (жоден актив не має більше ніж 50% суми від усього портфелю): 10 балів.`} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Один чи кілька активів ≥ 50% ваги: 0 балів.`} />
                </ListItem>
              </ul>
            </div>
            <div>
              <ListSubheader disableSticky sx={{ bgcolor: 'transparent' }} disableGutters>Збалансованість:</ListSubheader>
              <ul>
                <ListItem disableGutters>
                  <ListItemText primary={`Один актив займає > 60% ваги: -20 балів.`} />
                </ListItem>
              </ul>
            </div>
          </List>


        </div>
      </Box>
    </Modal>
  )
}

export default AnalyzePortfolio