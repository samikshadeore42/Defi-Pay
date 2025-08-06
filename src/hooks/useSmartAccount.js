import { useEffect, useState } from "react";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { createPublicClient, http } from "viem";
import { toCircleSmartAccount } from "@circle-fin/modular-wallets-core";
import { CHAIN_CONFIGS } from "../constants/chain";

export function useSmartAccount(chainId) {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [smartAccount, setSmartAccount] = useState(null);

  useEffect(() => {
    if (
      !isConnected ||
      !address ||
      !walletClient ||
      !chainId ||
      !(chainId in CHAIN_CONFIGS)
    ) {
      setSmartAccount(null);
      return;
    }
    async function fetchSmartAccount() {
      try {
        const { viemChain } = CHAIN_CONFIGS[chainId];
        const client = createPublicClient({
          chain: viemChain,
          transport: http(),
        });
        const account = await toCircleSmartAccount({
          client,
          owner: walletClient.account,
        });
        setSmartAccount(account.address);
      } catch (error) {
        console.error("Error creating Circle smart account:", error);
        setSmartAccount(null);
      }
    }
    fetchSmartAccount();
  }, [isConnected, address, walletClient, chainId]);
  return smartAccount;
}
