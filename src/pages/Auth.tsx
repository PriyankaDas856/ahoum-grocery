import { Link, useNavigate } from 'react-router-dom'

function Auth() {
  const navigate = useNavigate()

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

        {/* Phone login */}
        <button
          type="button"
          onClick={() => navigate('/auth/phone')}
          className="mt-7 flex h-12 w-full items-center border-b border-[#E2E2E2] text-left"
        >
          <span className="mr-3 text-lg">
            🇧🇩
          </span>

          <span className="text-sm text-[#181725]">
            +880
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
          onClick={() => navigate('/')}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-[#5382EC] text-sm font-semibold text-white"
        >
          <span className="mr-4 text-xl font-bold">
            G
          </span>

          Continue with Google
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#4F68AD] text-sm font-semibold text-white"
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