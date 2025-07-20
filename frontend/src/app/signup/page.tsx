'use client'
import React, { useState } from "react";
import { QrCode, User, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import petra from "@/assets/petra.png";
import google from "@/assets/GoogleIcon.webp";

declare global {
  interface Window {
    aptos?: {
      connect(): Promise<{ address: string; publicKey?: string; }>;
      disconnect?(): Promise<void>;
      isConnected?(): Promise<boolean>;
      account?(): Promise<{address: string; publicKey: string}>;
      signAndSubmitTransaction?(payload: any): Promise<any>;
    };
  }
}

type UserType = 'customer' | 'merchant' | null;

export default function Signup() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const router = useRouter();

  const handlePetraConnect = async () => {
    if (!window.aptos) {
      alert("Petra Wallet not found. Please install it.");
      return;
    }

    try {
      setIsConnecting(true);

      const alreadyConnected = await window.aptos.isConnected?.();
      if (!alreadyConnected) {
        await window.aptos.connect();
      }

      const account = await window.aptos.connect();
      if (!account || !account.address) {
        throw new Error("Wallet account not available");
      }

      // const res = await window.aptos.connect();
      // const walletAddress = res.address;

      // localStorage.setItem("wallet", walletAddress);
      // localStorage.setItem("connectedAt", Date.now().toString());

      if (!userType) {
        throw new Error("User type not selected");
      }

      const response = await fetch("http://localhost:2000/auth/connect-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet: account.address,
          userType
        })
      });

      if (!response.ok) {
        throw new Error("Failed to register wallet with backend");
      }

      setIsConnected(true);
      setIsConnecting(false);
      console.log("Connected to Petra Wallet:", account.address);
      router.push("/home");
    } catch (err) {
      setIsConnecting(false);
      console.error("Failed to connect to Petra Wallet:", err);
      alert("Failed to connect to Petra Wallet");
    }
  };

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    if (type === "merchant") {
      router.push("/merchant-questionnaire");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <section className="w-full max-w-sm space-y-8" aria-labelledby="wallet-connection">
          <header className="text-center space-y-6">
            <figure className="relative mx-auto w-48 h-48 bg-gray-800/50 rounded-2xl border border-gray-700/50 flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-xs font-bold text-white">₿</span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-xs font-bold text-white">Ξ</span>
              </div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                <span className="text-xs font-bold text-white">$</span>
              </div>
            </figure>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Connect with</p>
              <h1 id="wallet-connection" className="text-2xl font-bold">
                Sari<span className="text-green-500">Send</span>
              </h1>
            </div>
          </header>

          <section className="space-y-4" aria-labelledby="connection-methods">
            {!isConnected ? (
              <>
                {userType === null && (
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">I am a...</h3>
                    <button
                      onClick={() => handleUserTypeSelection("customer")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg">Customer</span>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-white text-sm">→</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleUserTypeSelection("merchant")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg">Merchant</span>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-white text-sm">→</span>
                      </div>
                    </button>
                  </div>
                )}

                {userType === "customer" && (
                  <>
                    <button
                      onClick={() => setUserType(null)}
                      className="w-full text-gray-400 hover:text-white text-sm py-2 transition-colors"
                    >
                      ← Back to user type selection
                    </button>

                    <button
                      onClick={handlePetraConnect}
                      disabled={isConnecting}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center">
                          <Image 
                            src={petra} 
                            alt="Petra Wallet" 
                            width={32} 
                            height={32} 
                            className="rounded-full" 
                          />
                        </span>
                        <span className="text-lg">
                          {isConnecting ? "Connecting..." : "Petra Wallet"}
                        </span>
                      </div>
                      {isConnecting ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <span className="text-black text-sm">→</span>
                        </div>
                      )}
                    </button>

                    <section className="relative" role="separator">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-black px-3 text-gray-500">or Login with Google</span>
                      </div>
                    </section>

                    <aside className="text-center space-y-3">
                      <button className="w-full bg-white text-black font-medium py-4 px-6 rounded-2xl flex items-center gap-3 group">
                        <span>
                          <Image 
                            src={google} 
                            alt="Google Icon" 
                            width={32} 
                            height={32} 
                          />
                        </span>
                        Sign in with Google
                      </button>
                    </aside>
                  </>
                )}
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Wallet Connected!</h3>
                    <p className="text-gray-400 text-sm">Your Petra wallet has been successfully connected to SariSend</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
