import { NavLink } from 'react-router-dom'

const navItems = [
  {
    label: 'Shop',
    path: '/home',
    icon: '⌂',
  },
  {
    label: 'Explore',
    path: '/explore',
    icon: '⌕',
  },
  {
    label: 'Cart',
    path: '/cart',
    icon: '🛒',
  },
  {
    label: 'Favourite',
    path: '/favourites',
    icon: '♡',
  },
  {
    label: 'Account',
    path: '/account',
    icon: '♙',
  },
]

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 bg-white px-4 pb-3 pt-2 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] md:px-8 md:py-3">
      <div className="mx-auto flex max-w-[1100px] items-center justify-center md:justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex min-w-[64px] flex-1 flex-col items-center gap-1 py-1 text-[10px] transition md:flex-row md:justify-center md:gap-2 md:text-sm ${
                isActive
                  ? 'font-semibold text-[#53B175]'
                  : 'text-[#7C7C7C]'
              }`
            }
          >
            <span className="text-xl leading-none md:text-lg">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav