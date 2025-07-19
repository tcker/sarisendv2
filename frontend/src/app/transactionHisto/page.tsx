'use client'
import React, { useState } from 'react'
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import APT from '@/assets/Aptos.png'
import BTC from '@/assets/BTC.png'
import ETH from '@/assets/ETH.png'
import Homebtn from '@/components/homeArrow'
import { StaticImageData } from 'next/image'

// TypeScript interfaces
interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  token: string;
  to: string;
  from: string;
  timestamp: string;
  status: 'completed' | 'pending';
  hash: string;
}

type FilterType = 'all' | 'send' | 'receive';

export default function TransHisto() {
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      amount: '0.5',
      token: 'ETH',
      to: '0x742d...4B8f',
      from: 'You',
      timestamp: '2024-12-07 14:30',
      status: 'completed',
      hash: '0xabc123...def456'
    },
    {
      id: '2',
      type: 'receive',
      amount: '1000',
      token: 'APT',
      to: 'You',
      from: '0x123a...9c2d',
      timestamp: '2024-12-07 12:15',
      status: 'completed',
      hash: '0x789xyz...uvw012'
    },
    {
      id: '3',
      type: 'send',
      amount: '0.025',
      token: 'BTC',
      to: '1A1z...P2Sh',
      from: 'You',
      timestamp: '2024-12-06 09:45',
      status: 'completed',
      hash: '0x345abc...789def'
    },
    {
      id: '4',
      type: 'receive',
      amount: '50',
      token: 'APT',
      to: 'You',
      from: '0x456b...7e8f',
      timestamp: '2024-12-05 16:20',
      status: 'completed',
      hash: '0x567def...123ghi'
    },
    {
      id: '5',
      type: 'send',
      amount: '250',
      token: 'APT',
      to: '0x789c...1a2b',
      from: 'You',
      timestamp: '2024-12-05 11:30',
      status: 'pending',
      hash: '0x890ghi...456jkl'
    }
  ]
  const filteredTransactions = transactions.filter(tx => {
    const matchesType = filterType === 'all' || tx.type === filterType
    const matchesSearch = searchTerm === '' || 
      tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTokenIcon = (token: string): StaticImageData => {
    const iconMap: Record<string, StaticImageData> = {
      'ETH': ETH,
      'BTC': BTC,
      'APT': APT
    }
    return iconMap[token] || ETH
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
       <Homebtn />
          <h1 className="text-xl sm:text-2xl font-bold">Transaction History</h1>
          <div className="w-10 sm:w-20"></div> {/* Spacer for center alignment */}
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 mb-6 border border-gray-700/30">
           <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm sm:text-base"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
                className="bg-gray-700/50 border border-gray-600 rounded-2xl px-3 py-3 text-white focus:outline-none focus:border-green-500 text-sm sm:text-base min-w-[80px]"
              >
                <option value="all">All</option>
                <option value="send">Sent</option>
                <option value="receive">Received</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/30 text-center">
              <p className="text-gray-400">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-gray-800/50 rounded-3xl p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">                    {/* Transaction Type Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'
                    }`}>
                      {tx.type === 'send' ? (
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                      )}
                    </div>{/* Token Icon */}
                    <img 
                      src={getTokenIcon(tx.token).src} 
                      alt={tx.token}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                    />

                    {/* Transaction Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold capitalize text-sm sm:text-base">{tx.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm truncate">
                        {tx.type === 'send' ? `To: ${tx.to}` : `From: ${tx.from}`}
                      </p>
                      <p className="text-gray-500 text-xs hidden sm:block">{tx.timestamp}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className={`font-bold text-sm sm:text-lg ${
                      tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                    </p>
                    <p className="text-gray-400 text-xs cursor-pointer hover:text-white transition-colors hidden sm:block" 
                       title={`Hash: ${tx.hash}`}>
                      View on Explorer
                    </p>
                  </div>
                </div>
                {/* Mobile timestamp */}
                <p className="text-gray-500 text-xs mt-2 sm:hidden">{tx.timestamp}</p>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredTransactions.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-3 rounded-2xl transition-colors shadow-lg">
              Load More Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}