import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const canLogin =
    email.trim().length > 0 &&
    password.trim().length > 0

  const handleLogin = () => {
    if (!canLogin) {
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white px-5 pt-5">
      <button
        type="button"
        onClick={() => navigate('/auth')}
        className="text-2xl text-[#181725]"
        aria-label="Back"
      >
        ‹
      </button>

      <main className="mt-20">
        <div className="text-center">
          <div className="text-5xl">
            🥕
          </div>
        </div>

        <h1 className="mt-10 text-[22px] font-semibold text-[#181725]">
          Logging
        </h1>

        <p className="mt-2 text-xs text-[#7C7C7C]">
          Enter your emails and password
        </p>

        {/* Email */}
        <div className="mt-8">
          <label className="text-xs font-medium text-[#7C7C7C]">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            className="mt-2 w-full border-b border-[#E2E2E2] pb-3 text-sm text-[#181725] outline-none placeholder:text-[#BDBDBD]"
          />
        </div>

        {/* Password */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#7C7C7C]">
              Password
            </label>

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
              }
              className="text-lg text-[#9B9B9B]"
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
            >
              {showPassword ? '◉' : '◌'}
            </button>
          </div>

          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            className="mt-2 w-full border-b border-[#E2E2E2] pb-3 text-sm text-[#181725] outline-none placeholder:text-[#BDBDBD]"
          />
        </div>

        <div className="mt-4 text-right">
          <button
            type="button"
            className="text-xs font-medium text-[#181725]"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={!canLogin}
          className="mt-6 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white disabled:bg-[#D9D9D9]"
        >
          Log In
        </button>

        <p className="mt-5 text-center text-xs text-[#181725]">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#53B175]"
          >
            Signup
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Login