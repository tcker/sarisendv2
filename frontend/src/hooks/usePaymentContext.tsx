'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface PaymentData {
  amount: number
  recipient: string
  recipientName?: string
  gasFee: number
  totalCost: number
  remainingBalance: number
  timestamp?: number
  transactionHash?: string
}

interface PaymentContextType {
  paymentData: PaymentData
  setPaymentData: (data: Partial<PaymentData>) => void
  clearPaymentData: () => void
}

const defaultPaymentData: PaymentData = {
  amount: 0,
  recipient: '',
  gasFee: 0.001,
  totalCost: 0,
  remainingBalance: 0,
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

interface PaymentProviderProps {
  children: ReactNode
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [paymentData, setPaymentDataState] = useState<PaymentData>(defaultPaymentData)

  const setPaymentData = (data: Partial<PaymentData>) => {
    setPaymentDataState(prev => ({ ...prev, ...data }))
  }

  const clearPaymentData = () => {
    setPaymentDataState(defaultPaymentData)
  }

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData, clearPaymentData }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePaymentContext(): PaymentContextType {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePaymentContext must be used within a PaymentProvider')
  }
  return context
}
