import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  LinearProgress,
  Stack,
} from "@mui/material";
import { readContract } from "@wagmi/core";
import { presaleContract, tokenContract } from "../../constants/environment";
import { formatEther } from "viem";
import { useAccount, useConfig } from "wagmi";

const Balance = () => {
  const config = useConfig();
  const { address } = useAccount();
  const [activePhase, setActivePhase] = useState(0);
  const [phaseDetails, setPhaseDetails] = useState(0);
  const [tokenBalance, setTotalBalance] = useState(0);
  const estPrice = formatEther(phaseDetails[0] ?? 0);
  const estimatedPrice = estPrice > 0 ? (1 / estPrice).toFixed(2) : "0";
  const totalTokens = formatEther(phaseDetails[1] ?? 0);
  const soldTokens = formatEther(phaseDetails[2] ?? 0);
  const amountRaisedMATIC = formatEther(phaseDetails[3] ?? 0);
  const soldPercentage = (soldTokens / totalTokens) * 100;
  const totalFormatedBalance = formatEther(tokenBalance);
  const totalBalanceNum = Number(totalFormatedBalance).toFixed(2);
  console.log("amountRaisedMATIC", amountRaisedMATIC);
  console.log("activePhase4", activePhase);
  console.log("phaseDetails4", phaseDetails);

  const init = async () => {
    try {
      const [phase, phaseDetail, balance] = await Promise.all([
        readContract(config, {
          ...presaleContract,
          functionName: "getActivePhase",
        }),
        readContract(config, {
          ...presaleContract,
          functionName: "getPhaseDetails",
          args: [activePhase ?? null],
        }),
        address
          ? readContract(config, {
              ...tokenContract,
              functionName: "balanceOf",
              args: [address],
            })
          : Promise.resolve(0), // Return 0 if address is not valid
      ]);

      setActivePhase(phase);
      setPhaseDetails(phaseDetail);
      setTotalBalance(balance); // balance will be 0 if the address was not valid
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [config, address, activePhase]);
  return (
    <Box
      sx={{
        mx: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          mb: 3,
          backgroundColor: "rgba(37, 45, 48, 0.9)",
          padding: "10px",
          borderRadius: "10px",
          border: "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography color="#ffffff" variant="h6">
          Your Balance
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#00AEEF",
          }}
        >
          {totalBalanceNum} KAFA
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 3,
          backgroundColor: "rgba(37, 45, 48, 0.9)", // Adjust the last value (0.7) to change transparency
          padding: "10px",
          borderRadius: "10px",
          border: "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Typography color="#ffffff" variant="h6">
          Estimated Selling Price at Launch
        </Typography>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: { xs: "20", md: "25px" },
            color: "#00AEEF",
          }}
        >
          {estimatedPrice} MATIC
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" color="#ffffff">
          Contribution per phase
        </Typography>
        <Typography variant="h5" color="#ffffff" fontWeight="500">
          Select phase:
        </Typography>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Button
            variant="contained"
            disabled={!(activePhase === 0)}
            sx={{
              "&:disabled": {
                backgroundColor: "#00AEEF70",
                cursor: "not-allowed",
                color: "#ffffff90",
              },
            }}
          >
            Phase 1
          </Button>
          <Button
            variant="contained"
            disabled={!(activePhase === 1)}
            sx={{
              "&:disabled": {
                backgroundColor: "#00AEEF70",
                cursor: "not-allowed",
                color: "#ffffff90",
              },
            }}
          >
            Phase 2
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            color="#ffffff"
            sx={{ fontSize: { xs: "12px", md: "14.17px" } }}
          >
            MATIC
          </Typography>
          <TextField
            fullWidth
            defaultValue="000.00"
            value={amountRaisedMATIC}
            variant="outlined"
            size="small"
            InputProps={{
              sx: {
                color: "#00AEEF",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="#00AEEF">
            Private Sale Progress
          </Typography>
          <Box
            sx={{
              background: "#00AEEF",
              px: "5px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="500" color="#ffffff">
              Phase {activePhase + 1}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="h5" color="#ffffff" fontWeight="500">
            0
          </Typography>
          <Typography
            variant="h5"
            color="#ffffff"
            fontWeight="500"
          >{`${totalTokens} KAFA`}</Typography>
        </Box>
        <LinearProgress
          height="30px"
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#00AEEF",
              borderRadius: 5,
            },
            background: "#8E939C",
            height: 9,
            borderRadius: 5,
            my: 1,
          }}
          variant="determinate"
          value={soldPercentage}
        />
        <Typography
          textAlign="center"
          variant="h5"
          color="#ffffff"
          fontWeight="500"
        >{`${soldTokens} KAFA`}</Typography>
      </Box>
    </Box>
  );
};

export default Balance;
