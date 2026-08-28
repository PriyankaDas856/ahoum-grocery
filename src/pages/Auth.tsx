import { useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'

function Auth() {
  const navigate = useNavigate()

  const [googleLoading, setGoogleLoading] =
    useState(false)

  const [googleError, setGoogleError] =
    useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setGoogleError(null)

    try {
      const provider = new GoogleAuthProvider()

      provider.setCustomParameters({
        prompt: 'select_account',
      })

      const result = await signInWithPopup(
        auth,
        provider,
      )

      if (result.user) {
        navigate('/home', { replace: true })
      }
    } catch (error: unknown) {
      console.error('Google sign-in failed:', error)

      setGoogleError(
        'Google sign-in was unsuccessful. Please try again.',
      )
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative h-[43vh] min-h-[300px] overflow-hidden bg-[#F7F7F7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#FFFFFF_0%,#F5F8F5_70%)]" />

        <div className="relative flex h-full items-center justify-center">
          <div className="text-[120px]">
            🥦
          </div>

          <div className="absolute left-8 top-14 text-5xl">
            🍅
          </div>

          <div className="absolute right-8 top-20 text-5xl">
            🥕
          </div>

          <div className="absolute bottom-8 left-16 text-5xl">
            🍎
          </div>

          <div className="absolute bottom-10 right-14 text-5xl">
            🥬
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-5 pt-8">
        <h1 className="text-[21px] font-bold leading-7 text-[#181725]">
          Get your groceries
          <br />
          with nectar
        </h1>

        {/* Phone authentication */}
        <button
          type="button"
          onClick={() => navigate('/auth/phone')}
          className="mt-7 flex h-12 w-full items-center border-b border-[#E2E2E2] text-left focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2"
        >
          <span className="mr-3 text-lg">
            🇮🇳
          </span>

          <span className="text-sm text-[#181725]">
            +91
          </span>

          <span className="ml-2 text-sm text-[#7C7C7C]">
            Enter mobile number
          </span>
        </button>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E2E2E2]" />

          <span className="text-xs text-[#7C7C7C]">
            Or connect with social media
          </span>

          <div className="h-px flex-1 bg-[#E2E2E2]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-[#5382EC] text-sm font-semibold text-white transition hover:bg-[#4675DF] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#5382EC] focus:ring-offset-2"
        >
          <span className="mr-4 text-xl font-bold">
            G
          </span>

          {googleLoading
            ? 'Signing in...'
            : 'Continue with Google'}
        </button>

        {/* Google error */}
        {googleError && (
          <p
            role="alert"
            className="mt-3 text-center text-xs text-red-500"
          >
            {googleError}
          </p>
        )}

        {/* Facebook */}
        <button
          type="button"
          onClick={() => {
            setGoogleError(
              'Facebook sign-in is not configured yet.',
            )
          }}
          className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#4F68AD] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#4F68AD] focus:ring-offset-2"
        >
          <span className="mr-4 text-xl font-bold">
            f
          </span>

          Continue with Facebook
        </button>

        {/* Existing account */}
        <div className="mt-8 text-center text-xs text-[#7C7C7C]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#53B175]"
          >
            Log In
          </Link>
        </div>

        {/* New account */}
        <div className="mt-3 pb-8 text-center text-xs text-[#7C7C7C]">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#53B175]"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Auth