import {
  Box,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Tokenbox from "./Tokenbox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState, useEffect } from "react";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import NotificationModal from "../NotificationModal/NotificationModal";
import {
  ActiveChain,
  presaleContract,
  tokenContract,
} from "../../constants/environment";
import { formatEther, formatUnits, parseUnits } from "viem";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import CommonButton from "../CommonButton";

const PrivateSale = () => {
  const { address, isConnected, chain } = useAccount();
  const { open } = useWeb3Modal();
  const { switchChain } = useSwitchChain();
  const [slect, setslect] = useState("MATIC");
  const [kafaAmount, setKafaAmount] = useState("");
  const [kafaAmountPerMatic, setKafaAmountPerMatic] = useState("");
  const [loading, setloading] = useState(false);
  const config = useConfig();
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [amount, setAmount] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [phaseDetails, setPhaseDetails] = useState(0);
  const estPrice = formatEther(phaseDetails[0] ?? 0);
  const estimatedPrice = 1 / estPrice;
  console.log("estimatedPrice", estimatedPrice);
  const totalTokens = formatEther(phaseDetails[1] ?? 0);
  console.log("totalTokens", totalTokens);
  const soldTokens = formatEther(phaseDetails[2] ?? 0);
  console.log("soldTokens", soldTokens);
  const remaingTokens = totalTokens - soldTokens;
  console.log("remaingTokens", remaingTokens);
  const soldPercentage = (soldTokens / totalTokens) * 100;
  console.log("soldPercentage", soldPercentage);

  const init = async () => {
    try {
      const [maticToToken, phase, phaseDetail] = await Promise.all([
        readContract(config, {
          ...presaleContract,
          functionName: "MaticToToken",
          args: [1],
        }),
        readContract(config, {
          ...presaleContract,
          functionName: "getActivePhase",
        }),
        readContract(config, {
          ...presaleContract,
          functionName: "getPhaseDetails",
          args: [activePhase],
        }),
      ]);

      setKafaAmountPerMatic(Number(maticToToken));
      setActivePhase(phase);
      setPhaseDetails(phaseDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [config, address, activePhase]);
  console.log("activePhase", activePhase);
  console.log("phaseDetails", phaseDetails);

  useEffect(() => {
    const onchangehendler = async () => {
      if (
        !isNaN(+amount && +amount != undefined && !+amount <= 0 && amount != "")
      ) {
        try {
          let amountsend = parseUnits(amount.toString(), 18);
          const [maticToToken, kafaDecimals] = await Promise.all([
            readContract(config, {
              ...presaleContract,
              functionName: "MaticToToken",
              args: [amountsend],
            }),
            readContract(config, {
              ...tokenContract,
              functionName: "decimals",
            }),
          ]);
          setKafaAmount(
            parseFloat(formatUnits(maticToToken, kafaDecimals)).toFixed(2)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    onchangehendler();
  }, [amount, slect]);

  const buytokens = async () => {
    if (!amount || isNaN(amount) || amount < 0 || amount === 0) {
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: "Please enter a valid amount.",
      });
    } else {
      try {
        setloading(true);
        let buyHash = await writeContract(config, {
          ...presaleContract,
          functionName: "buyTokenMatic",
          value: parseUnits(amount.toString(), 18),
        });
        await waitForTransactionReceipt(config, { hash: buyHash });
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: false,
          message: "Purchase successfuly completed.",
        });
        setloading(false);
      } catch (error) {
        setloading(false);
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: error.message,
        });
        console.log("e", error);
      }
    }
  };
  return (
    <Container maxWidth="lg">
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              backgroundColor: "rgba(37, 45, 48, 0.9)",
              padding: "10px",
              borderRadius: "10px",
              border: "0.4px solid rgba(140, 140, 140, 0.40)",
              boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontStyle: "normal",
                fontWeight: 700,
                color: "#00AEEF",
              }}
            >
              PRESALE
            </Typography>
            <Typography color="#ffffff" variant="h6" mb={1}>
              You can buy our KAFA tokens using MATIC.
            </Typography>
            <Tokenbox
              setslect={setslect}
              slect={slect}
              amount={amount}
              setAmount={setAmount}
              text={"From"}
            />
            <Box textAlign="center">
              <IconButton
                sx={{ color: "white", fontSize: { xs: "20px", sm: "40px" } }}
              >
                <ArrowDownwardIcon
                  sx={{ fontSize: { xs: "15px", sm: "20px" } }}
                />
              </IconButton>
            </Box>
            <Tokenbox text={"To"} kafaAmount={kafaAmount} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              color="white"
              sx={{ marginTop: "10px" }}
            >
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: { md: "17px", xs: "12px" },
                }}
              >
                Price:
              </Typography>
              <Typography
                sx={{
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: { md: "17px", xs: "12px" },
                }}
              >
                {kafaAmountPerMatic} KAFA per MATIC
              </Typography>
            </Stack>
            <Stack sx={{ my: "10px" }}>
              <CommonButton
                disabled={loading}
                onClick={() =>
                  !isConnected
                    ? open()
                    : chain?.id !== ActiveChain
                    ? switchChain({ chainId: ActiveChain })
                    : buytokens()
                }
              >
                {isConnected
                  ? chain?.id !== ActiveChain
                    ? "Wrong Network"
                    : loading
                    ? "processing..."
                    : "Buy KAFA"
                  : "Connect Wallet"}
              </CommonButton>
            </Stack>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrivateSale;
