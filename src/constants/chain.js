import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  sepolia,
  optimism,
  polygonMumbai,
  polygon,
  optimismGoerli,
} from "viem/chains";

export const CHAIN_CONFIGS = {
  421614: { // Arbitrum Sepolia
    viemChain: arbitrumSepolia,
    usdcAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  },
  43113: { // Avalanche Fuji
    viemChain: avalancheFuji,
    usdcAddress: "0x5425890298aed601595a70ab815c96711a31bc65",
  },
  84532: { // Base Sepolia (example)
    viemChain: baseSepolia,
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  11155111: { // Ethereum Sepolia
    viemChain: sepolia,
    usdcAddress: "0x1c7D4B166e59f2cF6D64B3Cab41aA3813A5AfE28",
  },
  137: { // Polygon mainnet
    viemChain: polygon,
    usdcAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  },
  80001: { // Polygon Mumbai
    viemChain: polygonMumbai,
    usdcAddress: "0xFEca406dA9727A25E71e732F9961F680059eF1F9",
  },
};
