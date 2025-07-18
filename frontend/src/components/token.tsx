'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import apt from "@/assets/Aptos.png"
import btc from "@/assets/BTC.png"
import eth from "@/assets/ETH.png"
import cl from '@/assets/CL.png'
import dm from '@/assets/DM.png'
import cos from '@/assets/Cos.png'
import { MoreHorizontal } from 'lucide-react'
import { StaticImageData } from 'next/image'

interface Token {
  name: string;
  symbol: string;
  value: string;
  change: string;
  positive: boolean;
  icon: StaticImageData;
}

export default function Token() {
  const router = useRouter();
  
  const tokens: Token[] = [
    { 
      name: 'Aptos', 
      symbol: 'APT', 
      value: '$100', 
      change: '+0.18%', 
      positive: true,
      icon: apt
    },
    { 
      name: 'BitCoin', 
      symbol: 'BTC', 
      value: '$100', 
      change: '-0.19%', 
      positive: false,
      icon: btc
    },
    { 
      name: 'Etherium', 
      symbol: 'ETH', 
      value: '$40', 
      change: '+0.24%', 
      positive: true,
      icon: eth
    },
    { 
      name: 'ChainLink', 
      symbol: 'LINK', 
      value: '$100', 
      change: '+0.18%', 
      positive: true,
      icon: cl
    },
    { 
      name: 'Cosmos', 
      symbol: 'ATOM', 
      value: '$100', 
      change: '-0.10%', 
      positive: false,
      icon: cos
    },
    { 
      name: 'Diem', 
      symbol: 'DLB', 
      value: '$40', 
      change: '+0.07%', 
      positive: true,
      icon: dm
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-medium">Tokens</h2>
        <button>
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-3">
        {tokens.map((token, index) => (
          <div 
            key={index} 
            onClick={() => router.push("/token-info")}
            className="block hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center p-2">
                  <Image 
                    src={token.icon} 
                    alt={token.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-medium">{token.name}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{token.value}</p>
                <p className={`text-sm ${token.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {token.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
