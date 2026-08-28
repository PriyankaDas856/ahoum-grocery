import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F2F8F3]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        {/* Image section */}
        <div className="relative h-[62vh] min-h-[500px] w-full overflow-hidden bg-[#E8F1E8] lg:h-screen lg:w-[55%]">
          {/* Soft background */}
          <div className="absolute inset-0 bg-[#E8F1E8]" />

          {/* Full grocery person image */}
          <img
            src="/images/grocery-person.png"
            alt="Grocery delivery person"
            className="relative z-10 h-full w-full object-contain object-center"
          />

          {/* Mobile overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/65 via-transparent to-transparent lg:hidden" />

          {/* Mobile text */}
          <div className="absolute inset-x-0 bottom-8 z-30 px-6 text-center text-white lg:hidden">
            <div className="mb-3 text-4xl">
              🥕
            </div>

            <h1 className="text-[34px] font-bold leading-[1.15]">
              Welcome
              <br />
              to our store
            </h1>

            <p className="mt-3 text-sm text-white/85">
              Get your groceries in as fast as one hour
            </p>

            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="mt-8 h-14 w-full rounded-xl bg-[#53B175] text-sm font-semibold text-white transition hover:bg-[#46A568] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Desktop content */}
        <div className="hidden flex-1 bg-white lg:flex lg:min-h-screen lg:items-center lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="mb-10">
              <span className="text-3xl font-bold tracking-tight text-[#53B175]">
                nectar
              </span>
            </div>

            <div className="mb-10">
              <div className="mb-5 text-5xl">
                🥕
              </div>

              <h1 className="text-5xl font-bold leading-[1.1] text-[#181725]">
                Welcome
                <br />
                to our store
              </h1>

              <p className="mt-5 max-w-[380px] text-base leading-6 text-[#7C7C7C]">
                Get your groceries in as fast as one hour.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="h-14 w-full rounded-xl bg-[#53B175] text-sm font-semibold text-white transition hover:bg-[#46A568] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#53B175] focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome