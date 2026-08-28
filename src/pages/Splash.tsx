import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/welcome', { replace: true })
    }, 2000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="fixed inset-0 flex min-h-screen w-full items-center justify-center bg-[#53B175]">
      <div className="flex flex-col items-center justify-center text-center text-white">
        {/* Nectar logo */}
        <div className="flex items-center gap-2">
          <span className="text-[42px] leading-none">
            🥕
          </span>

          <div className="text-left">
            <h1 className="text-[42px] font-medium leading-none tracking-tight">
              nectar
            </h1>

            <p className="mt-1 text-[7px] uppercase tracking-[0.35em]">
              online groceries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash