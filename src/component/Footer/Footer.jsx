
import {
  Box,
  Container,
  Grid,
  Stack,

} from "@mui/material";

import Twitter from "./assets/Twitter (3).png";
import Telegram from "./assets/Telegram-App.png";




const Footer = ({ mode }) => {

  return (
    <>
   
      <Box
        component="footer"
        sx={{
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: mode ? "#EFEFEF" : "#1C2426",
          padding: "20px",
          color: mode ? "#000" : "#fff",
        }}
      >
        <Container>
          <Grid spacing={2}>
            <Grid container>
              
              <Grid xs={12} md={12} >
               <Box sx={{display:"flex",justifyContent:"center",}}>
                <Stack direction="row" gap={3} py={3}>
                 
                 
                  <a
                    style={{ cursor: "pointer" }}
                    href="https://x.com/KAFA_NETWORK"
                  >
                    <img src={Twitter} alt="Twitter" width={30} height={30} />
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    href="https://t.me/+EEeP11PSFy43N2Ji "
                  >
                    <img src={Telegram} alt="Telegram" width={30} height={30} />
                  </a>
                </Stack>
                </Box>
                
                
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
