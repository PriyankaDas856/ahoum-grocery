import { NavLink } from 'react-router-dom'

const navItems = [
  {
    label: 'Shop',
    path: '/',
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
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-gray-100 bg-white px-3 pb-3 pt-2">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 text-[10px] transition ${
                isActive
                  ? 'font-semibold text-[#53B175]'
                  : 'text-[#7C7C7C]'
              }`
            }
          >
            <span className="text-xl leading-none">
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