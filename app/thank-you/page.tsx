'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Navigate to result page after 5 seconds automatically, or user can click proceed
    const timer = setTimeout(() => {
      router.push('/result')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        {/* Dotted geometric pattern background - rotating */}
        <div 
          className="absolute inset-0 opacity-[0.15] animate-pattern-rotate"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px),
              repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: 'center',
            transformOrigin: 'center center',
          }}
        />
        
        {/* Main content */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl sm:text-5xl font-normal text-center text-[#1A1B1C] mb-8">
            Thank you! Proceed for the next step.
          </h1>
          
          {/* Proceed button/link */}
          <Link 
            href="/result"
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-12 px-6 py-3 font-semibold text-sm bg-[#1A1B1C] text-white hover:bg-[#1A1B1C]/90"
          >
            PROCEED
          </Link>
        </div>
      </div>
    </>
  )
}

