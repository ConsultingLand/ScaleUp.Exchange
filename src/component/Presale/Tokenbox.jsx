import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import bnb from "./assets/bnb.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Tokenbox = ({ text, slect, amount, setAmount, kafaAmount }) => {
  let matches = useMediaQuery("(max-width:760px)");
  const inputStyle = {
    width: "100px",
    borderColor: "transparent",
    fontStyle: "normal",
    fontWeight: 400,
    background: "transparent",
    color: "white",
    fontSize: "15px",
  };
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "transparent",
          border: "1px solid #00AEEF",
          borderRadius: "10px",
          px: { xs: "7px", sm: "10px" },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontStyle: "normal",
                  fontWeight: 400,
                  marginTop: "7px",
                }}
              >
                {text}
              </Typography>
            </Box>
            <Box mt={2}>
              <input
                style={inputStyle}
                value={text == "From" ? amount : kafaAmount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="text"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton sx={{ borderRadius: "5px" }}>
              <Box
                sx={{
                  background: "transparent",
                  border: " 1px solid #00AEEF",
                  borderRadius: "10px",
                  p: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box px={{ md: "10px", xs: "3px" }}>
                  <img
                    style={{ marginTop: "5px" }}
                    src={text == "From" ? "./maticIcon.webp" : "./logo.jpg"}
                    alt="maticIcon"
                    width={matches ? 15 : 25}
                  />
                </Box>
                <Box
                  px={{ md: "10px", xs: "3px" }}
                  sx={{
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: { xs: "15px", sm: "17", md: "18px" },
                    color: "white",
                  }}
                >
                  {text == "From" ? slect : "KAFA"}
                </Box>
                <Box px={{ md: "10px", xs: "3px" }}>
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "#00AEEF",
                      fontSize: { xs: "20px", sm: "30px" },
                    }}
                  />
                </Box>
              </Box>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Tokenbox;
