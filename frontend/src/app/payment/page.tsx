'use client'
import React, { useState, useEffect } from 'react'
import { ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePaymentContext } from '../../hooks/usePaymentContext'

interface TransactionPayload {
  type: string;
  function: string;
  type_arguments: any[];
  arguments: (string | number)[];
}

interface TransactionResult {
  hash: string;
}

export default function Payment() {
  const [amount, setAmount] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setPaymentData } = usePaymentContext()

  const aptToUsdRate = 8.45
  const gasFee = 0.001

  const currentAmount = parseFloat(amount) || 0
  const usdAmount = currentAmount * aptToUsdRate
  const usdTotalCost = (currentAmount + gasFee) * aptToUsdRate

  useEffect(() => {
    const scannedData = searchParams.get('scannedData')
    if (scannedData) {
      setRecipient(decodeURIComponent(scannedData))
    }
  }, [searchParams])

  const handleAmountChange = (value: string): void => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSend = async (): Promise<void> => {
    if (!window.aptos?.signAndSubmitTransaction || !recipient || !amount) {
      alert('Petra wallet not connected or invalid data')
      return
    }

    try {
      const payload: TransactionPayload = {
        type: 'entry_function_payload',
        function: '0x1::aptos_account::transfer',
        type_arguments: [],
        arguments: [recipient, (currentAmount * 1_000_000).toFixed(0)], // convert APT to Octas
      }

      const tx: TransactionResult = await window.aptos.signAndSubmitTransaction(payload)
      console.log('Transaction sent:', tx)

      // Store transaction data in context for the confirmation page
      setPaymentData({
        amount: currentAmount,
        recipient,
        recipientName: `${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
        gasFee,
        totalCost: currentAmount + gasFee,
        timestamp: Date.now(),
        transactionHash: tx.hash,
      })

      router.push('/sent-confirm')
    } catch (error) {
      console.error('Transaction failed:', error)
      alert('Transaction failed. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-green-700 to-green-950 px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/home" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">Payment</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-6 py-8 space-y-10">
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-gray-300" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                {recipient ? (
                  <span className="text-green-400">
                    {recipient.slice(0, 6)}...{recipient.slice(-4)}
                  </span>
                ) : (
                  'No recipient scanned'
                )}
              </h2>
              <p className="text-gray-400 text-sm">Merchant Address</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center space-y-6">
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-4xl font-bold text-white text-center border-2 border-blue-500 rounded-2xl py-8 px-6 focus:outline-none focus:border-purple-500 transition-colors pb-16"
              />
              <div className="absolute inset-x-0 bottom-3 flex justify-between items-center px-6">
                <div className="text-left">
                  <p className="text-gray-400 text-sm">Enter Amount (APT)</p>
                  {currentAmount > 0 && (
                    <p className="text-blue-400 text-xs">
                      ≈ ${usdAmount.toFixed(2)} USD
                    </p>
                  )}
                </div>
                {currentAmount > 0 && (
                  <p className="text-yellow-400 text-xs">
                    Transaction: {gasFee.toFixed(6)} APT
                  </p>
                )}
              </div>
            </div>

            {currentAmount > 0 && (
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Amount:</span>
                  <div className="text-right">
                    <span className="text-white">{currentAmount.toFixed(6)} APT</span>
                    <div className="text-blue-400 text-xs">≈ ${usdAmount.toFixed(2)} USD</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transaction Fee (est.):</span>
                  <div className="text-right">
                    <span className="text-yellow-400">{gasFee.toFixed(6)} APT</span>
                    <div className="text-yellow-300 text-xs">
                      ≈ ${(gasFee * aptToUsdRate).toFixed(4)} USD
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-600 mt-2 pt-2 flex justify-between font-medium">
                  <span className="text-white">Total:</span>
                  <div className="text-right">
                    <span className="text-green-400">{(currentAmount + gasFee).toFixed(6)} APT</span>
                    <div className="text-green-300 text-xs">
                      ≈ ${usdTotalCost.toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <button
          onClick={handleSend}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </main>
  )
}
