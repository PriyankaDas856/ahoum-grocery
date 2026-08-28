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
      console.error(
        'Google sign-in failed:',
        error,
      )

      if (
        error instanceof Error &&
        error.message
      ) {
        setGoogleError(
          'Google sign-in was unsuccessful. Please try again.',
        )
      } else {
        setGoogleError(
          'Unable to sign in with Google. Please try again.',
        )
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <section className="relative flex h-[42vh] min-h-[260px] w-full items-center justify-center overflow-hidden bg-white sm:h-[46vh] sm:min-h-[300px] lg:h-[48vh] lg:min-h-[360px]">
        <img
          src="/images/auth.png"
          alt="Fresh groceries"
          className="h-full w-full object-contain object-center"
        />
      </section>

      {/* Authentication content */}
      <main className="mx-auto w-full max-w-[520px] px-5 pb-10 pt-7 sm:px-8 sm:pt-9 lg:max-w-[560px] lg:px-10 lg:pt-10">
        {/* Heading */}
        <h1 className="text-[21px] font-bold leading-7 text-[#181725] sm:text-2xl lg:text-[26px] lg:leading-8">
          Get your groceries
          <br />
          with nectar
        </h1>

        {/* Phone authentication */}
        <button
          type="button"
          onClick={() => navigate('/auth/phone')}
          className="mt-7 flex h-12 w-full items-center border-b border-[#E2E2E2] text-left transition focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2 sm:mt-8"
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
        <div className="my-7 flex items-center gap-3 sm:my-8 sm:gap-4">
          <div className="h-px flex-1 bg-[#E2E2E2]" />

          <span className="whitespace-nowrap text-[11px] text-[#7C7C7C] sm:text-xs">
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
            className="mt-3 text-center text-xs leading-5 text-red-500"
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
          className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#4F68AD] text-sm font-semibold text-white transition hover:bg-[#455D9E] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4F68AD] focus:ring-offset-2"
        >
          <span className="mr-4 text-xl font-bold">
            f
          </span>

          Continue with Facebook
        </button>

        {/* Existing account */}
        <div className="mt-8 text-center text-xs text-[#7C7C7C] sm:mt-9 sm:text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#53B175] focus:outline-none focus:ring-2 focus:ring-[#53B175]"
          >
            Log In
          </Link>
        </div>

        {/* New account */}
        <div className="mt-3 pb-4 text-center text-xs text-[#7C7C7C] sm:text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#53B175] focus:outline-none focus:ring-2 focus:ring-[#53B175]"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Auth