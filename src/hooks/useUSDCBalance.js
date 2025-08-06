import { useState, useEffect } from "react";
import { useChainId } from "wagmi";
import { createPublicClient, getContract, http } from "viem";
import { erc20Abi } from "viem";
import { CHAIN_CONFIGS } from "../constants/chain";

export function useUSDCBalance(address, chainId) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!address || !chainId || !(chainId in CHAIN_CONFIGS)) {
      setBalance("0");
      return;
    }
    async function fetchBalance() {
      try {
        const { viemChain, usdcAddress } = CHAIN_CONFIGS[chainId];
        const client = createPublicClient({
          chain: viemChain,
          transport: http(),
        });
        const usdcContract = getContract({
          client,
          address: usdcAddress,
          abi: erc20Abi,
        });
        const rawBalance = await usdcContract.read.balanceOf([address]);
        setBalance((Number(rawBalance) / 1e6).toFixed(6));
      } catch (error) {
        console.error("Failed to fetch USDC balance:", error);
        setBalance("0");
      }
    }
    fetchBalance();
  }, [address, chainId]);
  return balance;
}
