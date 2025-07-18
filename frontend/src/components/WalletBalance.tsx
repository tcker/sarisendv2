'use client'

import { useEffect, useState } from "react";

const NODE_URL = process.env.NEXT_PUBLIC_NODE_URL;

interface WalletBalanceProps {
  address: string;
}

interface AptosResource {
  type: string;
  data: {
    coin: {
      value: string;
    };
  };
}

export default function WalletBalance({ address }: WalletBalanceProps) {
  const [usdBalance, setUsdBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        console.log("Fetching balance for:", address);

        // Fetch resources from Aptos node
        const res = await fetch(`${NODE_URL}/accounts/${address}/resources`);
        const resources: AptosResource[] = await res.json();

        // Find APT balance
        const aptosCoinStore = resources.find((r) =>
          r.type.includes("0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>")
        );

        if (!aptosCoinStore) {
          setUsdBalance("0.00");
          return;
        }

        const rawValue = aptosCoinStore.data.coin.value;
        const aptAmount = parseFloat(rawValue) / 1e8;

        // Fetch APT-USD price from CoinGecko
        const priceRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd"
        );
        const priceData = await priceRes.json();
        const aptToUsd = priceData.aptos.usd;

        // Convert to USD
        const usd = aptAmount * aptToUsd;
        setUsdBalance(usd.toFixed(2));
      } catch (err) {
        console.error("Failed to fetch USD balance:", err);
        setUsdBalance("0.00");
      }
    };

    fetchBalance();
  }, [address]);

  return <span>{usdBalance !== null ? `$${usdBalance}` : "Loading..."}</span>;
}
