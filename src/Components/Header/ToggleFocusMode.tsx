import { Box, Button } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';


export default function ToggleFocusMode() {
  return (
    <Box sx={{ alignSelf: 'center', paddingLeft: '35%' }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<Fullscreen />}
        sx={{
            padding :"2px",
            
        }}  
      />
      
    </Box>
  );
}