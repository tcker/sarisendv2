"use client"
import React from 'react';
import { ArrowLeft, Check, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { usePaymentContext } from '@/hooks/usePaymentContext';

interface PaymentData {
  amount: number;
  recipient: string;
  gasFee: number;
  totalCost: number;
  remainingBalance: number;
  note?: string;
  timestamp?: number;
}

const SentConfirm: React.FC = () => {
  const { paymentData } = usePaymentContext()

  const paymentDataWithDefaults: PaymentData = {
    amount: paymentData.amount || 0.5,
    recipient: paymentData.recipient || '188AAA...BBBB',
    gasFee: paymentData.gasFee || 0.0001,
    totalCost: paymentData.totalCost || 0.5001,
    remainingBalance: paymentData.remainingBalance || 2.4999,
    timestamp: paymentData.timestamp || Date.now()
  }
  
  const formatDate = (timestamp: number | undefined): string => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }) + ' • ' + date.toLocaleTimeString('en-US');
  };

  const generateTransactionId = (): string => {
    return `${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
  };

  const generateTransactionHash = (): string => {
    return '0x' + Math.random().toString(16).substr(2, 40);
  };

  const calculateProcessingFee = (amount: number): number => {
    const fee = amount * 0.001; // 0.1%
    return Math.max(fee, 0.0001); // Minimum 0.0001 APT
  };

  const processingFee = calculateProcessingFee(paymentDataWithDefaults.amount);

  const formatRecipientId = (id: string | undefined): string => {
    if (!id) return '';
    return id.length > 10 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id;
  };

  const transactionData = {
    date: formatDate(paymentDataWithDefaults.timestamp),
    transactionId: generateTransactionId(),
    tokenSent: 'Aptos',
    recipientId: formatRecipientId(paymentDataWithDefaults.recipient),
    amount: `${paymentDataWithDefaults.amount.toFixed(6)} APT`,
    transactionFee: `${paymentDataWithDefaults.gasFee.toFixed(6)} APT`,
    processingFee: `${processingFee.toFixed(6)} APT`,
    total: `${paymentDataWithDefaults.totalCost.toFixed(6)} APT`,
    remainingBalance: `${paymentDataWithDefaults.remainingBalance.toFixed(6)} APT`,
    hash: generateTransactionHash()
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <header className="flex items-center justify-between mb-8">
         <Link 
           href="/home" 
           className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
         >
           <ArrowLeft className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl p-2 sm:p-3 text-black" />
         </Link>
          <h1 className="text-xl font-bold">Transaction Receipt</h1>
          <div className="w-10" aria-hidden="true"></div>
        </header>

        <article className="bg-white text-black rounded-t-3xl p-6 shadow-2xl relative">
          <div className="flex justify-center mb-6" aria-hidden="true">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>

          <header className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Transaction Successful!</h2>
            <p className="text-gray-600">Your transaction has been completed</p>
          </header>

          <time className="block text-center text-sm text-gray-500 mb-6" dateTime={new Date(paymentData.timestamp || 0).toISOString()}>
            {transactionData.date}
          </time>

          <section className="border-2 border-dashed border-gray-300 rounded-2xl p-4 mb-6 text-center">
            <h3 className="text-xs text-gray-500 mb-1">Transaction ID</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-sm">{transactionData.transactionId}</span>
              <button 
                onClick={() => copyToClipboard(transactionData.transactionId)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Copy transaction ID"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </section>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Token Sent</span>
            <span className="font-medium">{transactionData.tokenSent}</span>
          </div>

          <hr className="border-gray-200 mb-4" />

          <section className="space-y-3 mb-6">
            <h3 className="sr-only">Recipient Information</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Recipient ID</span>
              <span className="font-mono text-sm">{transactionData.recipientId}</span>
            </div>
          </section>

          <hr className="border-gray-200 mb-4" />

          <section className="space-y-3 mb-6">
            <h3 className="sr-only">Transaction Amount</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="font-medium">{transactionData.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction Fee</span>
              <span className="font-medium">{transactionData.transactionFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Processing Fee</span>
              <span className="font-medium">{transactionData.processingFee}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Sent</span>
              <span className="font-bold text-lg">{transactionData.total}</span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-500">Remaining Balance</span>
              <span className="font-medium text-green-600">{transactionData.remainingBalance}</span>
            </div>
          </section>

          <footer className="text-center">
            <h3 className="text-3xl font-bold">
              Sari<span className="text-green-500">Send</span>
            </h3>
          </footer>
        </article>

        <div className="bg-white h-6 relative" aria-hidden="true">
          <div className="absolute inset-0 bg-white" 
               style={{
                 clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%, 100% 100%, 0% 100%)'
               }}>
          </div>
        </div>

        <nav className="mt-8 space-y-4">
          <button
            onClick={() => copyToClipboard(transactionData.hash)}
            className="w-full flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 rounded-2xl px-6 py-4 text-white transition-colors"
            aria-label="Copy transaction hash to clipboard"
          >
            <Copy className="w-5 h-5" aria-hidden="true" />
            <span>Copy Transaction Hash</span>
          </button>

          <button 
            className="w-full flex items-center justify-center space-x-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600 rounded-2xl px-6 py-4 text-white transition-colors"
            onClick={() => window.open('https://explorer.aptoslabs.com/txn/' + transactionData.hash, '_blank')}
            aria-label="View transaction on blockchain explorer"
          >
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
            <span>View on Explorer</span>
          </button>

          <Link 
            href="/home"
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-2xl px-6 py-4 text-black font-medium transition-colors shadow-lg"
          >
            Back to Home
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default SentConfirm;