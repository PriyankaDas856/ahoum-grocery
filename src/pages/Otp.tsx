import { useEffect, useRef, useState } from 'react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  sendOtp,
  verifyOtp,
} from '../lib/phoneAuth'

function Otp() {
  const navigate = useNavigate()
  const location = useLocation()

  const phone = location.state?.phone ?? ''

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [seconds, setSeconds] = useState(25)

  const inputRef =
    useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (seconds <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setSeconds((current) =>
        Math.max(current - 1, 0),
      )
    }, 1000)

    return () => window.clearInterval(timer)
  }, [seconds])

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, '')
      .slice(0, 6)

    setCode(value)
    setError('')
  }

  const handleContinue = async () => {
    if (code.length !== 6) {
      setError(
        'Please enter the 6-digit verification code.',
      )
      return
    }

    setVerifying(true)
    setError('')

    try {
      await verifyOtp(code)

      navigate('/auth/location', {
        replace: true,
      })
    } catch (requestError: unknown) {
      console.error(
        'Firebase OTP verification error:',
        requestError,
      )

      if (
        requestError &&
        typeof requestError === 'object' &&
        'code' in requestError
      ) {
        const firebaseError =
          requestError as {
            code?: string
          }

        switch (firebaseError.code) {
          case 'auth/invalid-verification-code':
            setError(
              'Incorrect verification code. Please try again.',
            )
            break

          case 'auth/code-expired':
            setError(
              'This verification code has expired. Please request a new one.',
            )
            break

          case 'auth/session-expired':
            setError(
              'Your verification session has expired. Please request a new OTP.',
            )
            break

          default:
            setError(
              'Unable to verify the code. Please try again.',
            )
        }
      } else {
        setError(
          'Unable to verify the code. Please try again.',
        )
      }
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!phone || seconds > 0 || resending) {
      return
    }

    setResending(true)
    setError('')
    setCode('')

    try {
      await sendOtp(phone)

      setSeconds(25)

      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } catch (requestError: unknown) {
      console.error(
        'Firebase resend OTP error:',
        requestError,
      )

      if (
        requestError &&
        typeof requestError === 'object' &&
        'code' in requestError
      ) {
        const firebaseError =
          requestError as {
            code?: string
          }

        switch (firebaseError.code) {
          case 'auth/too-many-requests':
            setError(
              'Too many attempts. Please wait before requesting another code.',
            )
            break

          case 'auth/quota-exceeded':
            setError(
              'SMS limit reached. Please try again later.',
            )
            break

          default:
            setError(
              'Unable to resend the code. Please try again.',
            )
        }
      } else {
        setError(
          'Unable to resend the code. Please try again.',
        )
      }
    } finally {
      setResending(false)
    }
  }

  const formattedPhone = phone
    ? `${phone.slice(0, 5)}••••${phone.slice(-2)}`
    : 'your mobile number'

  return (
    <div className="min-h-screen bg-white px-5 pt-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate('/auth/phone')}
        disabled={verifying || resending}
        className="flex h-8 w-8 items-center text-3xl leading-none text-[#181725] disabled:opacity-40"
        aria-label="Back"
      >
        ‹
      </button>

      <main className="mt-12">
        <h1 className="text-[22px] font-semibold text-[#181725]">
          Enter your 6-digit code
        </h1>

        <p className="mt-2 text-xs text-[#7C7C7C]">
          Code sent to{' '}
          <span className="font-semibold text-[#181725]">
            {formattedPhone}
          </span>
        </p>

        {/* Code */}
        <label
          htmlFor="otp-code"
          className="mt-8 block text-xs font-medium text-[#7C7C7C]"
        >
          Code
        </label>

        <div
          className={`mt-2 flex border-b pb-3 ${
            error
              ? 'border-red-400'
              : 'border-[#E2E2E2]'
          }`}
        >
          <input
            ref={inputRef}
            id="otp-code"
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            value={code}
            onChange={handleCodeChange}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !verifying &&
                !resending
              ) {
                handleContinue()
              }
            }}
            maxLength={6}
            disabled={verifying || resending}
            placeholder="• • • • • •"
            className="w-full bg-transparent text-sm tracking-[8px] text-[#181725] outline-none placeholder:text-[#BDBDBD] disabled:opacity-50"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-xs text-red-500">
            {error}
          </p>
        )}

        {/* Resend */}
        <div className="mt-7 text-sm">
          <span className="text-[#9B9B9B]">
            Resend Code
          </span>{' '}

          {resending ? (
            <span className="font-medium text-[#53B175]">
              sending...
            </span>
          ) : seconds > 0 ? (
            <span className="font-medium text-[#53B175]">
              in 00:{String(seconds).padStart(2, '0')}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-[#53B175]"
            >
              Resend
            </button>
          )}
        </div>
      </main>

      {/* Continue */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={
          verifying ||
          resending ||
          code.length !== 6
        }
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#53B175] text-3xl text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Verify OTP"
      >
        {verifying ? '…' : '›'}
      </button>
    </div>
  )
}

export default Otp