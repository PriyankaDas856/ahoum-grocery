import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Shop', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Cart', path: '/cart' },
  { label: 'Favourite', path: '/search' },
  { label: 'Account', path: '/search' },
]

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 py-1 text-[10px] ${
                isActive
                  ? 'font-semibold text-[#53B175]'
                  : 'text-gray-500'
              }`
            }
          >
            <span className="text-base">●</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav