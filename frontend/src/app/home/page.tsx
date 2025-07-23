'use client'

import React, { useState, useRef, useEffect } from "react";
import { QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserProfile from "@/components/icon";
import QrScanner from "@/components/QrScanner";
import menu from '@/assets/Menu Button.png';
import Ellipsis from "@/assets/Ellipse.png";
import Token from "@/components/token";
import Ads from "@/components/ads";
import Sidebar from "@/components/Sidebar";
import WalletBalance from "@/components/WalletBalance";
import { getWalletProvider } from "@/utils/getWalletProvider";
import toast from 'react-hot-toast';

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [receiver, setReceiver] = useState("");
  const [mode, setMode] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const connect = async () => {
      const savedWallet = localStorage.getItem("walletProvider") as 'petra' | 'pontem' | undefined;
      const provider = await getWalletProvider(savedWallet);
      const isAlreadyConnected = await provider.isConnected?.();
      if (!isAlreadyConnected) {
        await provider.connect();
      }

      const account = await provider.account?.();
      if (account?.address) {
        localStorage.setItem("walletAddress", account.address);
        localStorage.setItem("walletProvider", provider.name); 
        router.push("/Home");
      }
    };

    connect();
  }, []);



   

  const disconnectWallet = async () => {
    setWallet("");
    localStorage.removeItem("wallet");
    localStorage.removeItem("connectedAt"); 

    if (window.aptos?.disconnect) {
      try {
        await window.aptos.disconnect();
      } catch (err) {
        console.warn("Wallet disconnect error:", err);
      }
    }

    router.push("/");
  };


    const connectWallet = async () => {
      const preferredWallet = localStorage.getItem("walletProvider") as "petra" | "pontem" | null;
      const provider = getWalletProvider(preferredWallet || undefined);

      if (!provider) {
        toast.error("No supported wallet found (Petra or Pontem)");
        return;
      }

      try {
        const isAlreadyConnected = await provider.isConnected?.();
        if (!isAlreadyConnected) {
          await provider.connect();
        }

        const account = await provider.account?.();

        console.log("📦 Account data:", account);

        let address = "";

        if (typeof account === "string") {
          address = account;
        } else if (typeof account === "object" && account?.address) {
          address = account.address;
        }

        if (!address) {
          throw new Error("Wallet address not available");
        }

        console.log("✅ Connected:", address);
        setWallet(address);

        // Save used wallet type for next time
        localStorage.setItem("walletProvider", provider.name);
        localStorage.setItem("walletAddress", address);

        toast.success("Wallet connected successfully");
      } catch (e) {
        console.error(e);
        toast.error(`Failed to connect to ${provider.name || "wallet"}`);
      }
    };

  



  return (
    <main className="min-h-screen mx-4 p-4 relative overflow-hidden">
      <div className="absolute top-[-6rem]">
        <Image 
          src={Ellipsis} 
          alt="Background decoration" 
          className="w-4xl h-4xl object-contain" 
        />
      </div>

      <header className="relative flex items-center justify-between mb-8 pt-4">
        <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
          <UserProfile 
            profileImage={menu.src} 
            walletAddress={wallet} 
            disconnectWallet={disconnectWallet}
            isMerchant={false}
          />
        </div>

        {!wallet ? (
          <button
            onClick={connectWallet}
            className="bg-green-500 text-black rounded-full px-6 py-2 font-mono shadow-md shadow-green-500/80 hover:shadow-green-500/90 transition-all duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-green-500 text-sm">Connected</span>
        )}
      </header>

      <section className="relative z-10 flex-col items-center gap-2 mb-4">
        <p>Balance</p>
        <h1 className="text-4xl text-green-400">
          {wallet ? (
            <WalletBalance address={wallet} />
          ) : (
            "$--.--"
          )}
        </h1>
      </section>

      {mode === "scan" && (
        <QrScanner
          onScan={(text: string) => {
            setReceiver(text);
            setMode("send");
          }}
          onClose={() => setMode("")}
        />
      )}

      <section className="relative z-10 bg-gradient-to-b from-[#FFFDFD]/40 via-[#FFFDFD]/20 to-[#FFFFFF]/0 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 mb-6 mt-10">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setMode("scan")}
        >
          <div className="relative mb-4">
            <div className="w-30 h-30 bg-gray-800 rounded-lg flex items-center justify-center">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-500 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-green-500 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-green-500 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-500 rounded-br-lg"></div>
          </div>
          <span className="text-green-500 font-medium">Scan QR</span>
        </div>
      </section>

      <Ads />
      <Token />

      {isSidebarOpen && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          walletAddress={wallet}
          disconnectWallet={disconnectWallet}
          isMerchant={false}
        />
      )}
    </main>
  );
}
