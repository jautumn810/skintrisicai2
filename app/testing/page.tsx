'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'

export default function TestingPage() {
  const router = useRouter()
  const nameInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    if (name && name.trim()) {
      setIsSubmitting(true)
      try {
        // Phase 1: POST /api/user - Create user account
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.trim() }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          // Store user ID and name in sessionStorage
          sessionStorage.setItem('userId', data.data.id)
          sessionStorage.setItem('userName', data.data.name)
          router.push('/city')
        } else {
          console.error('Error creating user:', data.error)
          alert('Failed to create user account. Please try again.')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('An error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        {/* Dotted geometric pattern background - subtle overlapping squares/diamonds with rotation */}
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
        <div className="absolute top-16 left-9 text-left z-10">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full z-10">
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
          <form
            className="relative z-10"
            id="name-form"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center"></div>
            <input
              ref={nameInputRef}
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              type="text"
              autoComplete="off"
              autoFocus
              name="name"
              id="name-input"
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        </div>
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
          <BackButton href="/" />
        </div>
      </div>
    </>
  )
}

