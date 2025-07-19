'use client'
import React from 'react'
import { ArrowLeft, Shield, Users, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/assets/logo.png'
import Image from 'next/image'

export default function About() {
  const router = useRouter()
  const goBack = () => {
    router.back() // Goes back one page in history
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={goBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold">About SariSend</h1>
          <div className="w-20"></div> {/* Spacer for center alignment */}
        </div>        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 mb-8 border border-green-500/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image src={Logo} alt="SariSend Logo" className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">SariSend Wallet</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your secure, user-friendly gateway to the world of cryptocurrency. Send, receive, and manage your digital assets with confidence.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-green-400">Secure & Safe</h3>
            <p className="text-gray-300">
              State-of-the-art encryption and security protocols protect your assets. Your private keys never leave your device.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Lightning Fast</h3>
            <p className="text-gray-300">
              Experience near-instant transactions with optimized blockchain interactions and minimal fees.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">User Friendly</h3>
            <p className="text-gray-300">
              Intuitive design makes cryptocurrency accessible to everyone, from beginners to crypto veterans.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-orange-400">Multi-Chain</h3>
            <p className="text-gray-300">
              Support for multiple blockchains including Ethereum, Bitcoin, Aptos and more coming soon.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/30 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            SariSend was built with the vision of making cryptocurrency accessible, secure, and easy to use for everyone. 
            We believe that digital assets should be as simple to manage as traditional banking, without compromising on 
            security or control. Our goal is to bridge the gap between complex blockchain technology and everyday users.
          </p>
        </div>

        {/* Version & Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Version Info</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Version:</span> 1.0.0</p>
              <p><span className="text-gray-400">Build:</span> 2024.12.0</p>
              <p><span className="text-gray-400">Last Updated:</span> December 2024</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/30">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Support</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Email:</span> support@sarisend.com</p>
              <p><span className="text-gray-400">Website:</span> www.sarisend.com</p>
              <p><span className="text-gray-400">Documentation:</span> docs.sarisend.com</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-700/30">
          <p className="text-gray-400">
            Made with ❤️ by the SariSend team
          </p>
        </div>
      </div>
    </div>
  )
}