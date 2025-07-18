'use client'
import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import logo from '@/assets/logo.png'
import one from '@/assets/hello1.png'
import two from '@/assets/hello2.png'
import three from '@/assets/hello3.png'

export default function Welcome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = [
    {
      id: 0,
      type: 'intro',
      title: 'SariSend',
      description: 'Your crypto wallet for everyday life.',
      image: logo,
      showContinue: true
    },
    {
      id: 1,
      type: 'feature',
      title: 'Welcome to SariSend',
      subtitle: 'Instant Crypto Payments, One Scan Away',
      image: one,
      showDots: true
    },
    {
      id: 2,
      type: 'feature', 
      title: "From token to Sari-Sari Store, you're covered",
      subtitle: "SariSend makes crypto transactions easy and accessible.",
      image: two,
      showDots: true
    },
    {
      id: 3,
      type: 'feature',
      title: 'Just Scan, Tap, and Enjoy.',
      subtitle: 'Experience seamless transactions with SariSend.',
      image: three,
      showDots: true,
      isLast:true
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide()
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide()
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div 
        className="h-screen flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="max-w-md w-full text-center">
            
            {/* Intro Slide (First slide) */}
            {currentSlideData.type === 'intro' && (
              <div className="space-y-8">
                <div className=" flex items-center justify-center mb-6">
                  <img 
                    src={currentSlideData.image.src} 
                    alt="SariSend Logo"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Sari<span className="text-green-500">Send</span>
                  </h1>
                  <p className="text-gray-400 text-sm mb-2">{currentSlideData.subtitle}</p>
                  <p className="text-white text-lg">{currentSlideData.description}</p>
                </div>
              </div>
            )}

            {/* Feature Slides */}
            {currentSlideData.type === 'feature' && (
              <section className="space-y-8">
                <div className="w-80 h-64 mx-auto mb-8 flex items-start justify-items-start">
                  <img 
                    src={currentSlideData.image.src} 
                    alt={`Feature ${currentSlideData.id}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className='text-left'>
                  <h2 className="text-5xl font-extrabold mb-4 mr-8 leading-tight">
                    {currentSlideData.title}
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-300">
                    {currentSlideData.subtitle}
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Navigation Dots (for feature slides) */}
        {currentSlideData.showDots && (
          <div className="flex justify-center space-x-2 mb-8">
            {slides.slice(1).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index + 1)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index + 1 ? 'bg-green-500' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 2}`}
              />
            ))}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-3 rounded-full transition-all ${
                currentSlide === 0 
                  ? 'invisible' 
                  : 'bg-black/50 hover:bg-gray-900/70 border border-gray-600'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Continue/Next Button */}
            {currentSlideData.isLast ? (
              <Link
                href="/signup"
                className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-4 rounded-full transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={nextSlide}
                className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-4 rounded-full transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>{currentSlideData.showContinue ? 'Continue' : 'Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Skip Button (top right) */}
        {currentSlide > 0 && !currentSlideData.isLast && (
          <Link
            href="/signup"
            className="absolute top-8 right-6 text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </Link>
        )}
      </div>
    </main>
  )
}
