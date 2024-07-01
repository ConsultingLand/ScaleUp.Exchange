import tokenAbi from "./tokenAbi.json";
import stakingAbi from "./stakingAbi.json";
import airdropAbi from "./airdropAbi.json";
import presaleAbi from "./presaleAbi.json";
import { http, createConfig } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";

export const presaleContract = {
  address: "0x7b1C3D242890fe3ED4b2100FdA04Dd6151b2cdb2", //testnet
  abi: presaleAbi,
};
export const airdropContract = {
  address: "0x90C2f017aAEc21791590aF87847c8D090489F865", //testnet
  abi: airdropAbi,
};

export const kafaStaking = {
  address: "0x601b429efd5b58aAEC4A954e67019fD346e5874A", //testnet
  abi: stakingAbi,
};

export const usdtContract = {
  address: "0x06586Bd752de3a3D4e5F2e2FE8897587d40262c7", //testnet
  abi: tokenAbi,
};
export const tokenContract = {
  address: "0xc69c688048F6422ABb4441C01C4B5b4DBE4B5Af3", //testnet
  abi: tokenAbi,
};

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});

export const bscUrl = "https://testnet.bscscan.com/address/";
export const ActiveChain = 97;
export let getSliceAddress = (address) =>
  address?.slice(0, 4) + "..." + address?.slice(-4);
export const getCommas = (value, percision = 2) => {
  value = parseFloat(value).toFixed(percision);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
