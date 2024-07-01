import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import shaps  from '../../assets/shaps.png'

function KafaNetwork({mode}) {
  return (
    <Container maxWidth="lg" sx={{pt:"40px"}}>
    <Grid container spacing={10}>
    <Grid item xs={12} md={6}>
      <Typography variant="h1">PRESALE.KAFA.NETWORK</Typography>
      <Typography variant="h1">Grow More Than Coffee with KAFA</Typography>
      <Box
        sx={{
          background: mode ? "#ffff" : "#000",
          padding: "15px",
          borderRadius: "50px",
          width:{xs:"100%",md:"90%"},
          textAlign: "center",
          position: 'relative',
          mt:"10px",
         
        }}
      >
        <Typography variant="h6">1,000,000 coffee tree</Typography>
      </Box>
      <Box
        sx={{
          background: mode ? "#ffff" : "#000",
          padding: "15px",
          borderRadius: "50px",
          width:{xs:"100%",md:"90%"},
          mt: "10px",
          textAlign: "center",
         
        
        }}
      >
        <Typography variant="h6">1,000,000 olive trees</Typography>
      </Box>
      <Box
        sx={{
          background: mode ? "#ffff" : "#000",
          padding: "15px",
          borderRadius: "50px",
          width:{xs:"100%",md:"90%"},
        mt:"10px",
          textAlign: "center",
         
       
        }}
      >
        <Typography variant="h6">
          Emphasis on Sustainability and Environmental Conservation
        </Typography>
      </Box>
      <Box
        sx={{
          background: mode ? "#ffff" : "#000",
          padding: "15px",
          borderRadius: "50px",
          width:{xs:"100%",md:"90%"},
          mt: "10px",
          textAlign: "center",
      
        }}
      >
        <Typography variant="h6">
          Traceability, Transparency, and Consumer Engagement
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
<Box>
  <img src={shaps} alt="kafa-network" width="100%"/>
</Box>

    </Grid>
    </Grid>
    
    </Container>
  )
}

export default KafaNetwork