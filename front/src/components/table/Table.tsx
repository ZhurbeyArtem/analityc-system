import { BuySellType } from '@/enums/dermache.enum';
import { useBuySellDermacheForm } from '@/hooks/openDermacheBuySellForm';
import { IDermache } from '@/interfaces/IDermache';
import { Button } from '@mui/material';
import TableMui from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { FC } from 'react'


interface ITable {
  arr: IDermache[];
}

const columns = [
  { field: 'ticker', headerName: 'Тікер', width: 150 },
  { field: 'buyCount', headerName: 'Кількість куплених', width: 150 },
  { field: 'buyPrice', headerName: ' Ср ціна входу', width: 150 },
  { field: 'currentPrice', headerName: 'Теперішня ціна', width: 150 },
  { field: 'profit', headerName: 'Прибуток', width: 150 },
  { field: 'profitPercent', headerName: 'Прибуток у відцотках', width: 150 },
  { field: 'sellPrice', headerName: 'Ср ціна продажу', width: 150 },
  { field: 'sellCount', headerName: 'Кількість проданих', width: 150 },
  { field: 'volativity', headerName: 'Волативність', width: 150 },


];

const Table: FC<ITable> = ({ arr }) => {
  const { setOpen, setType, setTicker } = useBuySellDermacheForm()
  const handleClick = (ticker: string) => {
    setOpen()
    setType(BuySellType.sell)
    setTicker(ticker)
  }
  return (
    <TableContainer sx={{
      overflowX: 'auto',
      maxWidth: {
        sm: 684,
        lg: "none"

      }
    }} >
      <TableMui >
        <TableHead>
          <TableRow>
            {columns.map(colum => <TableCell sx={{
              fontWeight: 600,
              maxWidth: 120,
              fontSize: 12
            }} key={colum.field}>{colum.headerName}</TableCell>)}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody >
          {arr.map(dermache =>
            <TableRow key={dermache.id} sx={{ '& > *': { borderBottom: 'unset', fontSize: 14 } }}>
              <TableCell component="th" scope="row">
                {dermache.ticker}
              </TableCell>
              <TableCell >{dermache.buyCount}</TableCell>
              <TableCell >{dermache.buyPrice.toFixed(2)}$</TableCell>
              <TableCell >{dermache.currentPrice}$</TableCell>
              <TableCell sx={dermache.profit > 0 ? { color: 'rgb(21, 185, 21)' } : { color: 'red' }}>{dermache.profit}$</TableCell>
              <TableCell sx={dermache.profit > 0 ? { color: 'rgb(21, 185, 21)' } : { color: 'red' }}>{dermache.profitPercent}%</TableCell>
              <TableCell >{dermache.sellPrice && `${dermache.sellPrice}$`}</TableCell>
              <TableCell >{dermache.sellCount}</TableCell>
              <TableCell >{dermache.volatility.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant='outlined' onClick={() => handleClick(dermache.ticker)}>Продати</Button>
              </TableCell>
            </TableRow>




          )}

        </TableBody>
      </TableMui>
    </TableContainer >
  )
}

export default Table