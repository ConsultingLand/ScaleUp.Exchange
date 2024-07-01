import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PrivateSale from "./PrivateSale";
import Balance from "./Balance";
import PhasesInfo from "./PhasesInfo";

const PresaleTabs = ({ mode }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabContent = [<PrivateSale />, <Balance />, <PhasesInfo />];
  const hoverStyle = {
    "&:hover": {
      bgcolor: "#35353B",
    },
  };

  return (
    <>
      <Container maxWidth="md" sx={{ paddingTop: "7px" }}>
        <Box
          sx={{
            flexGrow: 1,
            mx: "auto",
            marginTop: "70px",
            backgroundColor: "rgba(37, 45, 48, 0.8)", // Adjust the last value (0.7) to change transparency
            borderRadius: "10px",
            border: "0.4px solid rgba(140, 140, 140, 0.40)",
            boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
            textColor="#ffffff"
            indicatorColor="transparent"
          >
            <Tab
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h5" color="#ffffff" fontWeight="600">
                    Private Sale
                  </Typography>
                </div>
              }
              sx={{
                borderRadius: "5px",
                m: 1,
                bgcolor: value === 0 ? "#ffffff70" : "transparent",
                ...hoverStyle,
              }}
            />
            <Tab
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h5" color="#ffffff" fontWeight="600">
                    Balance
                  </Typography>
                </div>
              }
              sx={{
                borderRadius: "5px",
                m: 1,
                bgcolor: value === 1 ? "#ffffff70" : "transparent",
                ...hoverStyle,
              }}
            />
            <Tab
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h5" color="#ffffff" fontWeight="600">
                    Phases Info
                  </Typography>
                </div>
              }
              sx={{
                borderRadius: "5px",
                m: 1,
                bgcolor: value === 2 ? "#ffffff70" : "transparent",
                ...hoverStyle,
              }}
            />
          </Tabs>
          <Divider
            sx={{
              width: "100%",
              borderBottom: "1.5px solid #737373D4",
            }}
          />
          <Box sx={{ py: 2 }}>
            {tabContent.map((content, index) => (
              <div
                key={index}
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
              >
                {value === index && <div>{content}</div>}
              </div>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PresaleTabs;
