import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

function AppShell() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto min-h-screen w-full max-w-[430px] pb-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}

export default AppShell