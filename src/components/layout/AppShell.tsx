import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

function AppShell() {
  return (
    <div className="min-h-screen bg-[#F2F3F2]">
      <div className="mx-auto min-h-screen w-full max-w-[1280px] bg-white shadow-sm">
        <main className="min-h-screen pb-24">
          <Outlet />
        </main>

        <BottomNav />
      </div>
    </div>
  )
}

export default AppShell