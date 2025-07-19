'use client'
import React, { useState } from 'react'
import { ArrowLeft, Building, MapPin, Phone, Mail, User, FileText, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import QrScanner from '@/components/QrScanner'

// TypeScript interfaces
interface FormData {
  businessName: string;
  businessType: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  businessRegistration: string;
  taxId: string;
  website: string;
  monthlyRevenue: string;
  description: string;
}

type BusinessType = 'retail' | 'restaurant' | 'ecommerce' | 'services' | 'marketplace' | 'other' | '';
type RevenueRange = '0-1000' | '1000-5000' | '5000-10000' | '10000-25000' | '25000+' | '';

export default function MerchantQuestionnaire() {  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    businessRegistration: '',
    taxId: '',
    website: '',
    monthlyRevenue: '',
    description: ''
  })
  
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [showQrScanner, setShowQrScanner] = useState<boolean>(false)
  const totalSteps: number = 3
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form and navigate to home
      console.log('Merchant data:', formData)
      router.push('/merchant')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/signup')
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType && formData.ownerName
      case 2:
        return formData.email && formData.phone && formData.address && formData.city && formData.country
      case 3:
        return formData.businessRegistration && formData.description
      default:
        return false
    }
  }
  const handleQrScan = (scannedData: string) => {
    console.log('QR Code scanned:', scannedData)
    setShowQrScanner(false)
    // Navigate to merchant page with scanned data
    router.push('/merchant')
  }

  const handleQrClose = () => {
    setShowQrScanner(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-950 px-4 py-6">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Merchant Registration</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-100">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-green-100">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-green-800/30 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <Building className="w-12 h-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Business Information</h2>
              <p className="text-gray-400">Tell us about your business</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select business type</option>
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant/Food Service</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="services">Professional Services</option>
                  <option value="marketplace">Online Marketplace</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Owner Name *
                </label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Full name of business owner"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>            </div>
            
            
            {/* <button
              onClick={() => setShowQrScanner(true)}
              className="w-full bg-gray-700 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200"
            >
              📱 Or scan with your EMVQR
            </button> */}
          </section>
        )}

        {/* Step 2: Contact & Location */}
        {currentStep === 2 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Contact & Location</h2>
              <p className="text-gray-400">How can we reach you?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Country"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.yourbusiness.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Business Details */}
        {currentStep === 3 && (
            <section className="space-y-6">
                <div className="text-center space-y-2">
                    
              <h2 className="text-2xl font-bold text-white">Business Details</h2>
              <p className="text-gray-400">Final details to complete registration</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="businessRegistration" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Registration Number *
                </label>
                <input
                  type="text"
                  id="businessRegistration"
                  name="businessRegistration"
                  value={formData.businessRegistration}
                  onChange={handleInputChange}
                  placeholder="Your business registration/license number"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-300 mb-2">
                  Tax ID (Optional)
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="Tax identification number"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Monthly Revenue (Optional)
                </label>
                <select
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="">Select revenue range</option>
                  <option value="0-1000">$0 - $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-25000">$10,000 - $25,000</option>
                  <option value="25000+">$25,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Description *
                </label>                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your business and what you sell..."
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-bold py-4 px-6 rounded-2xl transition-all duration-200"
          >
            {currentStep === totalSteps ? 'Complete Registration' : 'Continue'}
          </button>
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Step {currentStep} of {totalSteps} • All fields marked with * are required
            </p>
          </div>

          <div className="my-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400 whitespace-nowrap">Register using your QR</span>
            <div className="w-full border-t border-gray-600"></div>
          </div>

          <button
            onClick={() => setShowQrScanner(true)}
            className="w-full bg-gray-700 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200"
          >
            📱 Or scan with your EMVQR
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-green-500 mt-0.5">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-7-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">
                Secure & Confidential
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Your business information is encrypted and will only be used for account verification and compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQrScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">Scan EMVQR Code</h3>
              <p className="text-gray-400 text-sm">Point your camera at the EMVQR code</p>
            </div>
            <QrScanner onScan={handleQrScan} onClose={handleQrClose} />
          </div>
        </div>
      )}
    </main>
  )
}