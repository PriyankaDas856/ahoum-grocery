import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2F8F3]">
      {/* Background image area */}
      <div className="absolute inset-0">
        <div className="h-[68%] bg-[radial-gradient(circle_at_50%_20%,#B8D7A8_0%,#6E9A5C_45%,#36552F_100%)]" />

        <div className="absolute inset-x-0 top-0 h-[68%] bg-black/10" />

        {/* Grocery illustration */}
        <div className="absolute inset-x-0 top-20 flex justify-center text-[110px]">
          🥬
        </div>

        <div className="absolute -bottom-12 -left-8 text-[150px]">
          🥖
        </div>

        <div className="absolute bottom-0 right-[-30px] text-[150px]">
          🥦
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-8 pb-10 text-white">
        <div className="mb-7 text-center">
          <div className="mb-4 text-4xl">
            🥕
          </div>

          <h1 className="text-[34px] font-bold leading-10">
            Welcome
            <br />
            to our store
          </h1>

          <p className="mt-3 text-sm text-white/80">
            Get your groceries in as fast as one hour
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/auth')}
          className="h-14 w-full rounded-xl bg-[#53B175] text-sm font-semibold text-white transition active:scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Welcome