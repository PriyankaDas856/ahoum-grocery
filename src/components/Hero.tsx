import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="mx-auto mt-5 w-full max-w-[1180px] px-4 sm:px-6 lg:px-10">
      <Link
        to="/category/Fruits%20%26%20Vegetables"
        className="group relative block h-[180px] overflow-hidden rounded-2xl bg-[#FFFDF8] sm:h-[220px] lg:h-[260px]"
      >
        {/* Banner background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#FFFFFF_0%,#FFF8EC_55%,#F2F8F3_100%)]" />

        {/* Left vegetables */}
        <div className="pointer-events-none absolute bottom-0 left-[-20px] z-10 h-[90%] w-[32%] sm:left-[-10px] sm:h-[95%] sm:w-[30%] lg:left-0 lg:h-full lg:w-[28%]">
          <img
            src="/images/fresh-fruits-&-vegetables.png"
            alt=""
            className="h-full w-full object-contain object-left-bottom"
          />
        </div>

        {/* Right vegetables */}
        <div className="pointer-events-none absolute bottom-0 right-[-15px] z-10 h-[65%] w-[25%] sm:right-0 sm:h-[70%] sm:w-[22%] lg:h-[75%] lg:w-[20%]">
          <img
            src="/images/bell-pepper-red.png"
            alt=""
            className="h-full w-full object-contain object-right-bottom"
          />
        </div>

        {/* Main banner content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-[25px] font-bold leading-tight text-[#181725] sm:text-[34px] lg:text-[44px]">
            Fresh Vegetables
          </h1>

          <p className="mt-1 text-[18px] font-semibold text-[#53B175] sm:text-[24px] lg:text-[30px]">
            Get Up To 40% OFF
          </p>

          {/* Slider indicators */}
          <div className="mt-4 flex items-center gap-3 sm:mt-5">
            <span className="h-2.5 w-8 rounded-full bg-[#53B175]" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#A7A7A7]" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#A7A7A7]" />
          </div>
        </div>
      </Link>
    </section>
  )
}

export default Hero