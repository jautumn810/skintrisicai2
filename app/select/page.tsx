'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Link from 'next/link'
import Image from 'next/image'

export default function SelectPage() {
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updatedAttributes, setUpdatedAttributes] = useState<any>({})

  useEffect(() => {
    // Load analysis data from sessionStorage
    const storedAnalysis = sessionStorage.getItem('analysisData')
    if (storedAnalysis) {
      try {
        const parsed = JSON.parse(storedAnalysis)
        setAnalysisData(parsed)
        setUpdatedAttributes(parsed)
      } catch (error) {
        console.error('Error parsing analysis data:', error)
      }
    }
  }, [])

  const handleAttributeUpdate = async (key: string, value: any) => {
    const newAttributes = {
      ...updatedAttributes,
      [key]: value,
    }
    setUpdatedAttributes(newAttributes)

    // Phase 2: PUT /api/user/attributes - Update user attributes
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      console.error('User ID not found')
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch('/api/user/attributes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          attributes: newAttributes,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Update sessionStorage with new attributes
        sessionStorage.setItem('analysisData', JSON.stringify(newAttributes))
        console.log('Attributes updated successfully')
      } else {
        console.error('Error updating attributes:', data.error)
        alert('Failed to update attributes. Please try again.')
      }
    } catch (error) {
      console.error('Error updating attributes:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!analysisData) {
    return (
      <>
        <Header />
        <div className="min-h-[90vh] flex flex-col items-center justify-center">
          <p>No analysis data found. Please upload an image first.</p>
          <BackButton href="/result" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div>
        <div className="absolute top-10 left-8 text-left mt-5">
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm mt-1 text-muted-foreground uppercase leading-[24px]">
            A.I. has estimated the following.
            <br />
            Fix estimated information if needed.
          </p>
        </div>
        <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
                <Image
                  alt="Diamond Small"
                  loading="lazy"
                  fill
                  style={{
                    objectFit: 'contain',
                    color: 'transparent',
                  }}
                  src="/Diamond-dark-small.png"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
                <Image
                  alt="Diamond Medium"
                  loading="lazy"
                  fill
                  style={{
                    objectFit: 'contain',
                    color: 'transparent',
                  }}
                  src="/Diamond-medium-medium.png"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
                <Image
                  alt="Diamond Large"
                  loading="lazy"
                  fill
                  style={{
                    objectFit: 'contain',
                    color: 'transparent',
                  }}
                  src="/Diamond-dark-small.png"
                />
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
              <div className="flex items-center justify-center col-start-2">
                <Link href="/summary">
                  <button
                    onClick={() => {
                      // Store updated attributes before navigating
                      if (Object.keys(updatedAttributes).length > 0) {
                        sessionStorage.setItem(
                          'analysisData',
                          JSON.stringify(updatedAttributes)
                        )
                      }
                    }}
                    className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
                  >
                    <span className="transform -rotate-45">Demographics</span>
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center row-start-2 col-start-1">
                <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                  <span className="transform -rotate-45">Cosmetic Concerns</span>
                </button>
              </div>
              <div className="flex items-center justify-center row-start-2 col-start-3">
                <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                  <span className="transform -rotate-45">Skin Type Details</span>
                </button>
              </div>
              <div className="flex items-center justify-center row-start-3 col-start-2">
                <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                  <span className="transform -rotate-45">Weather</span>
                </button>
              </div>
            </div>
          </div>
          {/* Display AI Analysis Results */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
            <h3 className="font-semibold mb-2">AI Analysis Results:</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Age:</strong> {updatedAttributes.age || analysisData.age}
              </p>
              <p>
                <strong>Skin Type:</strong>{' '}
                {updatedAttributes.skinType || analysisData.skinType}
              </p>
              <p>
                <strong>Plausibility:</strong>{' '}
                {updatedAttributes.plausibility || analysisData.plausibility}%
              </p>
              {updatedAttributes.demographics && (
                <p>
                  <strong>Demographics:</strong>{' '}
                  {JSON.stringify(updatedAttributes.demographics)}
                </p>
              )}
            </div>
            {isUpdating && (
              <p className="text-xs text-gray-500 mt-2">Updating...</p>
            )}
          </div>
        </div>
        <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
          <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
            <BackButton href="/result" />
            <Link href="/summary">
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    SUM
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    GET SUMMARY
                  </span>
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
