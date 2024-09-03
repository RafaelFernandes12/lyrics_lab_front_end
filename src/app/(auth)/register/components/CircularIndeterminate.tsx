import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress size={24} sx={{ color: 'white' }} />
    </Box>
  )
}
