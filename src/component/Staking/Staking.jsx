import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
// import { getCommas } from "../../ConnectivityAss/hooks";
import moment from "moment";
import Countdown from "react-countdown";
import Timer from "./Timer";
import React, { useEffect, useState } from "react";
import NotificationModal from "../NotificationModal/NotificationModal";
import { useAccount, useConfig } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  getCommas,
  kafaStaking,
  tokenContract,
} from "../../constants/environment";
import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { formatEther, parseUnits } from "viem";

const columns = [
  {
    id: "DepositedAmount",
    label: "Deposited Amount",
    minWidth: 150,
    align: "center",
  },
  { id: "StartTime", label: "Start Time", minWidth: 170, align: "center" },
  { id: "EndTime", label: "End Time", minWidth: 170, align: "center" },
  {
    id: "AmountWithdrawn",
    label: "Amount Withdrawn",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "WithdrawableAmount",
    label: "Withdrawable Amount",
    minWidth: 200,
    align: "center",
  },
  {
    id: "Withdraw",
    label: "Withdraw",
    minWidth: 170,
    align: "center",
  },
];

// Define constants for pagination
const ITEMS_PER_PAGE = 7; // Adjust as needed
const INITIAL_PAGE = 0;

let depositData = 20;

const Staking = ({ mode }) => {
  const color = mode ? "#00AEEF" : "#00AEEF";
  const [selectedPlan, setSelectedPlan] = useState("");
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [loading, setLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState({});
  const config = useConfig();
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [IDs, setIDs] = useState([]);
  const [userDepositeDetails, setUserDepositeDetails] = useState();
  const [amount, setAmount] = useState(0);
  const [withdrwableAmount, setWithdrwableAmount] = useState(0);
  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  console.log("selectedPlan", selectedPlan);
  console.log("userDepositeDetailsS", userDepositeDetails);

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  // Calculate pagination boundaries
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice data based on current page and reverse the rows
  const paginatedAndReversedData = userDepositeDetails
    ?.slice()
    .reverse() // Reverse the array
    .slice(startIndex, endIndex); // Slice based on current page

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const onChangeHandler = (event) => {
    let amount = event.target.value;
    let amountStr = amount.toString();
    let amountEntered = parseUnits(amountStr, 18);
    console.log("amountEntered", amountEntered);
    setAmount(amountEntered);
  };

  const stakTokens = async () => {
    if (!selectedPlan) {
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: "Please select a plan.",
      });
      return;
    }

    if (!amount || amount <= 0) {
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: "Please enter a valid amount.",
      });
      return;
    }

    try {
      setLoading(true);
      // First transaction: Approve
      let approveHash = await writeContract(config, {
        ...tokenContract,
        functionName: "approve",
        args: [kafaStaking.address, amount],
      });
      await waitForTransactionReceipt(config, { hash: approveHash });
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: false,
        message: "Approval successfully completed.",
      });

      // Second transaction: Staking
      let stakingHash = await writeContract(config, {
        ...kafaStaking,
        functionName: "invest",
        args: [amount, selectedPlan],
      });
      await waitForTransactionReceipt(config, { hash: stakingHash });
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: false,
        message: "Staking successfully completed.",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("error", error);
    }
  };

  const withdrawTokens = async (index) => {
    try {
      setWithdrawLoading((prevLoading) => ({
        ...prevLoading,
        [index]: true,
      }));

      let withdrawHash = await writeContract(config, {
        ...kafaStaking,
        functionName: "withdraw",
        args: [index],
      });
      await waitForTransactionReceipt(config, { hash: withdrawHash });
      setnotificationProps({
        modal: true,
        error: false,
        message: "Withdrawal successfully completed.",
      });

      setWithdrawLoading((prevLoading) => ({
        ...prevLoading,
        [index]: false,
      }));
    } catch (error) {
      setWithdrawLoading((prevLoading) => ({
        ...prevLoading,
        [index]: false,
      }));
      setnotificationProps({
        modal: true,
        error: true,
        message: error.message,
      });
      console.log("error", error);
    }
  };

  const init = async () => {
    try {
      // Fetch user deposit IDs
      let ids = await readContract(config, {
        ...kafaStaking,
        functionName: "getUserDepositIds",
        args: [address],
      });
      ids = ids.map((id) => Number(id));
      // Fetch deposit info for each ID
      const depositInfoPromises = ids.map((_, id) =>
        readContract(config, {
          ...kafaStaking,
          functionName: "getUserDepositInfo",
          args: [address, id],
        })
      );
      // Await all deposit info promises
      const depositInfo = await Promise.all(depositInfoPromises);
      // Fetch withdrwable amount
      const withdrwablePromises = ids.map((_, id) =>
        readContract(config, {
          ...kafaStaking,
          functionName: "getUserDividends",
          args: [address, id],
        })
      );

      const withdrwable = await Promise.all(withdrwablePromises);

      // Set state with fetched data
      setIDs(ids);
      setUserDepositeDetails(depositInfo);
      setWithdrwableAmount(withdrwable);
    } catch (error) {
      console.log(error, "calling");
    }
  };

  useEffect(() => {
    if (address) {
      init();
    }
  }, [address]);

  console.log("IDs", IDs);
  console.log("userDepositeDetails", userDepositeDetails);
  console.log("withdrwableAmount", withdrwableAmount);

  return (
    <Container maxWidth="lg" sx={{ py: "50px" }}>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Container maxWidth="lg">
        <Typography variant="h1" textAlign="center">
          Staking
        </Typography>
        <Divider color={color} sx={{ mt: "10px" }} />
        <Grid container sx={{ mt: "10px" }} spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: mode
                  ? "rgba(37, 45, 48, 0.8)"
                  : "rgba(37, 45, 48, 0.9)",
                paddingX: "15px",
                paddingTop: "20px",
                borderRadius: "10px",
                border: "0.4px solid rgba(140, 140, 140, 0.40)",
                boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: mode ? "2px solid #00AEEF" : "2px solid #00AEEF",
                  borderRadius: "5px",
                  padding: "8px",
                  mb: "20px",
                }}
              >
                <Typography
                  sx={{ color: mode ? "#00AEEF" : "#E0F7FA" }}
                  fontWeight="600"
                  mb={1}
                  variant="h3"
                >
                  Select a plan:
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="plans"
                    name="plans"
                    value={selectedPlan}
                    onChange={handlePlanChange}
                    row
                  >
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio sx={{ color: mode ? "#00AEEF" : "#E0F7FA" }} />
                      }
                      sx={{
                        color: mode ? "#00AEEF" : "#E0F7FA",
                        "& .MuiFormControlLabel-label": {
                          fontFamily: "Inter Variable",
                          fontWeight: "700",
                          fontSize: "22px",
                          display: "flex",
                        },
                      }}
                      label="30 days"
                    />
                    <FormControlLabel
                      value="2"
                      control={
                        <Radio sx={{ color: mode ? "#00AEEF" : "#E0F7FA" }} />
                      }
                      sx={{
                        color: mode ? "#00AEEF" : "#E0F7FA",
                        "& .MuiFormControlLabel-label": {
                          fontFamily: "Inter Variable",
                          fontWeight: "700",
                          fontSize: "22px",
                        },
                      }}
                      label="60 days"
                    />
                    <FormControlLabel
                      value="3"
                      control={
                        <Radio sx={{ color: mode ? "#00AEEF" : "#E0F7FA" }} />
                      }
                      sx={{
                        color: mode ? "#00AEEF" : "#E0F7FA",
                        "& .MuiFormControlLabel-label": {
                          fontFamily: "Inter Variable",
                          fontWeight: "700",
                          fontSize: "22px",
                        },
                      }}
                      label="90 days"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <TextField
                onChange={onChangeHandler}
                fullWidth
                label="Enter staking amount"
                focused
                InputProps={{
                  sx: {
                    color: color,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: color,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: color,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: color,
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: color,
                    "&.Mui-focused": {
                      color: color,
                    },
                  },
                }}
                sx={{
                  "& label.Mui-focused": {
                    color: color,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: color,
                    },
                    "&:hover fieldset": {
                      borderColor: color,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: color,
                    },
                  },
                }}
              />
              <Stack alignItems="center">
                <LoadingButton
                  variant="contained"
                  loading={loading}
                  disabled={loading}
                  loadingPosition="end"
                  sx={{
                    background: mode ? "#00AEEF" : "#00AEEF",
                    transition: "background 0.3s",
                    px: "30px",
                    py: "10px",
                    mt: "20px",
                    maxWidth: "200px",
                  }}
                  color="primary"
                  onClick={address ? stakTokens : open}
                >
                  {address
                    ? loading
                      ? "Processing"
                      : "Stak"
                    : "Connect Wallet"}
                </LoadingButton>
              </Stack>
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  mx: "auto",
                  // border: mode
                  //   ? "0.4px solid #00AEEF"
                  //   : "0.4px solid rgba(140, 140, 140, 0.40)",
                  my: "20px",
                }}
                align="center"
              >
                <Box my={4}>
                  <Typography
                    fontWeight="600"
                    mb={1}
                    variant="h1"
                    textAlign="center"
                  >
                    Deposit Details
                  </Typography>
                </Box>
                <TableContainer
                  sx={{
                    maxWidth: "100%",
                    overflowX: "auto",
                    display: "block",
                    "@media screen and (max-width: 600px)": {
                      width: "100vw",
                    },
                  }}
                >
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ minWidth: "100%" }}
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            sx={{
                              background:
                                "linear-gradient(293.69deg, #E0F7FA -2.22%, #00AEEF 100%)",
                            }}
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedAndReversedData?.length > 0 ? (
                        paginatedAndReversedData.map((details, index) => {
                          const [duration, amount, withdrawn, start, end] =
                            details;

                          return (
                            <TableRow key={index}>
                              <TableCell
                                sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                              >
                                &nbsp;{getCommas(formatEther(amount ?? 0))}
                              </TableCell>
                              <TableCell
                                sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                              >
                                {moment.unix(Number(start)).format("lll")}
                              </TableCell>
                              <TableCell
                                sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                              >
                                {end + start > 0 ? (
                                  <Countdown
                                    zeroPadTime={true}
                                    date={moment
                                      .unix(Number(end) + Number(start))
                                      .toDate()}
                                    renderer={(props) => (
                                      <Timer {...props} mode={mode} />
                                    )}
                                  />
                                ) : (
                                  <Typography
                                    sx={{
                                      color: mode ? "#00AEEF" : "#ffffff",
                                    }}
                                  >
                                    00:00:00:00
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell
                                sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                              >
                                &nbsp;{getCommas(formatEther(withdrawn))}
                              </TableCell>
                              {withdrwableAmount &&
                                withdrwableAmount[index] !== undefined && (
                                  <TableCell
                                    sx={{
                                      color: mode ? "#00AEEF" : "#ffffff",
                                    }}
                                  >
                                    &nbsp;
                                    {getCommas(
                                      formatEther(withdrwableAmount[index])
                                    )}
                                  </TableCell>
                                )}
                              <TableCell
                                sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                              >
                                <LoadingButton
                                  variant="contained"
                                  loading={withdrawLoading[index]}
                                  disabled={withdrawLoading[index]}
                                  loadingPosition="end"
                                  sx={{
                                    background: "#00AEEF",
                                    transition: "background 0.3s",
                                    px: "30px",
                                    py: "10px",
                                    mt: "20px",
                                    maxWidth: "150px",
                                    borderRadius: "22px",
                                    fontSize: "10px",
                                  }}
                                  color="primary"
                                  onClick={
                                    address ? () => withdrawTokens(index) : open
                                  }
                                >
                                  {address
                                    ? withdrawLoading[index]
                                      ? "Processing"
                                      : "Withdraw"
                                    : "Connect Wallet"}
                                </LoadingButton>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell
                            sx={{ color: mode ? "#00AEEF" : "#ffffff" }}
                            colSpan={6} // Adjusted the colspan to 5 to accommodate the extra column
                            style={{ textAlign: "center" }}
                          >
                            No deposit data found.
                          </TableCell>
                        </TableRow>
                      )}
                      {/* Pagination controls */}
                      {userDepositeDetails?.length > ITEMS_PER_PAGE && (
                        <TableRow>
                          <TablePagination
                            colSpan={6}
                            rowsPerPageOptions={[]}
                            count={userDepositeDetails.length}
                            rowsPerPage={ITEMS_PER_PAGE}
                            page={currentPage}
                            onPageChange={(event, newPage) =>
                              handlePageChange(newPage)
                            }
                            labelDisplayedRows={({ from, to, count }) =>
                              `${from}-${to} of ${count}`
                            }
                            sx={{
                              color: mode ? "#00AEEF" : "#ffffff",
                              "& .Mui-selected": {
                                backgroundColor: mode ? "#00AEEF" : "#ffffff", // Optional: Change background color of selected page number
                                color: mode ? "#ffffff" : "#000000", // Optional: Change text color of selected page number
                                "&:hover": {
                                  backgroundColor: mode ? "#007BBB" : "#f0f0f0", // Optional: Hover state background color
                                  color: mode ? "#ffffff" : "#000000", // Optional: Hover state text color
                                },
                              },
                              "& .MuiTablePagination-actions": {
                                "& .MuiIconButton-root": {
                                  color: mode ? "#00AEEF" : "#ffffff", // Optional: Pagination control buttons color
                                  "&:hover": {
                                    backgroundColor: mode
                                      ? "#007BBB"
                                      : "#f0f0f0", // Optional: Pagination control buttons hover background color
                                    color: mode ? "#ffffff" : "#000000", // Optional: Pagination control buttons hover text color
                                  },
                                },
                              },
                            }}
                          />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Staking;
