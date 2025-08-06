import { useEffect, useState } from "react";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { createPublicClient, http } from "viem";
import { toCircleSmartAccount } from "@circle-fin/modular-wallets-core";
import { arbitrumSepolia } from "viem/chains";

export function useSmartAccount() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const [smartAccount, setSmartAccount] = useState(null);

  useEffect(() => {
    if (
      !isConnected ||
      !address ||
      chainId !== arbitrumSepolia.id ||
      !walletClient
    ) {
      setSmartAccount(null);
      return;
    }

    async function fetchSmartAccount() {
      try {
        const client = createPublicClient({
          chain: arbitrumSepolia,
          transport: http(),
        });

        const account = await toCircleSmartAccount({
          client,
          owner: walletClient.account, // <--- FIX: pass full account object
        });

        setSmartAccount(account.address);
      } catch (error) {
        console.error("Error creating Circle smart account:", error);
        setSmartAccount(null);
      }
    }

    fetchSmartAccount();
  }, [isConnected, address, chainId, walletClient]);

  return smartAccount;
}
