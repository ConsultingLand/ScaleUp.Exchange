import tokenAbi from "./tokenAbi.json";
import stakingAbi from "./stakingAbi.json";
import airdropAbi from "./airdropAbi.json";
import presaleAbi from "./presaleAbi.json";
import { http, createConfig } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";

export const presaleContract = {
  address: "0x19C8A68d0EC47FcbECB7c79d6e99308598eE2A23", //testnet
  abi: presaleAbi,
};
export const airdropContract = {
  address: "0x90C2f017aAEc21791590aF87847c8D090489F865", //testnet
  abi: airdropAbi,
};

export const kafaStaking = {
  address: "0xc20c53FeC0714834b771eA96354Df7C8e18A96Ed", //testnet
  abi: stakingAbi,
};

export const usdtContract = {
  address: "0x06586Bd752de3a3D4e5F2e2FE8897587d40262c7", //testnet
  abi: tokenAbi,
};
export const tokenContract = {
  address: "0x2cCE9d4cC6612D1775bB6Ff2a9f989c788b895f6", //testnet
  abi: tokenAbi,
};

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});

export const bscUrl = "https://testnet.bscscan.com/address/";
export const ActiveChain = 137;
export let getSliceAddress = (address) =>
  address?.slice(0, 4) + "..." + address?.slice(-4);
export const getCommas = (value, percision = 2) => {
  value = parseFloat(value).toFixed(percision);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
