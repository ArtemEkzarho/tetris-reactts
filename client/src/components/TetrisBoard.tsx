import { useEffect } from 'react'
import { Card, Grid, Stack } from '@mui/material'
import { getCellColor } from '../helpers'
import useMobileControls from '../hooks/useMobileControls'
import { Board } from '../helpers/types'
import { StartGamePopover } from './StartGamePopover'
import { EndGamePopover } from './EndGamePopover'
import { SideBoard } from './SideBoard'
import { useMovements } from '../hooks/useMovements'

type Props = {
  board: Board
  resetBoard: ({
    startGame,
    endGame,
  }: {
    startGame?: boolean | undefined
    endGame?: boolean | undefined
  }) => void
}

export const TetrisBoard = ({ board, resetBoard }: Props) => {
  const { moveTo, rotate } = useMovements()

  useMobileControls(rotate, moveTo)

  // Effect to handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'x':
          rotate()
          break
        case 'ArrowDown':
          moveTo({ y: 1 })
          break
        case 'ArrowLeft':
          moveTo({ x: -1 })
          break
        case 'ArrowRight':
          moveTo({ x: 1 })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [moveTo, rotate])

  return (
    <Grid container height="100%" width="50vh">
      <Grid item xs={9}>
        <Stack height="100%" sx={{ position: 'relative' }}>
          <StartGamePopover resetBoard={resetBoard} />
          <EndGamePopover resetBoard={resetBoard} />
          {board.map((row, y) => (
            <Stack flex={1} direction="row" key={y} justifyContent="space-between">
              {row.map((cell, x) => (
                <Card
                  variant="outlined"
                  key={x}
                  sx={{
                    flex: '1',
                    width: '100%',
                    height: '100%',
                    backgroundColor: getCellColor(cell),
                  }}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <SideBoard resetBoard={resetBoard} />
      </Grid>
    </Grid>
  )
}
