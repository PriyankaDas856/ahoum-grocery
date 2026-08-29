import { useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'

function AccountDetails() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
      },
    )

    return unsubscribe
  }, [])

  const displayName =
    user?.displayName?.trim() || 'Ahoum User'

  const email =
    user?.email || 'Not available'

  const phone =
    user?.phoneNumber || 'Not available'

  const provider =
    user?.providerData[0]?.providerId ===
    'google.com'
      ? 'Google'
      : user?.phoneNumber
        ? 'Phone'
        : 'Account'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase(),
    )
    .join('')

  return (
    <div className="min-h-screen bg-white px-4 pb-10 pt-6 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-[740px]">
        {/* Header */}
        <header className="flex items-center">
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5] text-2xl text-[#181725]"
            aria-label="Go back"
          >
            ‹
          </button>

          <h1 className="text-xl font-semibold text-[#181725]">
            My Details
          </h1>
        </header>

        {/* Profile */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
          <div className="flex flex-col items-center px-5 py-7 text-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#53B175] text-2xl font-semibold text-white">
                {initials || 'A'}
              </div>
            )}

            <h2 className="mt-4 text-lg font-semibold text-[#181725]">
              {displayName}
            </h2>

            <span className="mt-2 rounded-full bg-[#EAF6ED] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#53B175]">
              {provider} Member
            </span>
          </div>

          {/* Details */}
          <div className="border-t border-[#EEEEEE]">
            <div className="border-b border-[#EEEEEE] px-5 py-4">
              <p className="text-xs text-[#9B9B9B]">
                Name
              </p>

              <p className="mt-1 text-sm font-medium text-[#181725]">
                {displayName}
              </p>
            </div>

            <div className="border-b border-[#EEEEEE] px-5 py-4">
              <p className="text-xs text-[#9B9B9B]">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-[#181725]">
                {email}
              </p>
            </div>

            <div className="border-b border-[#EEEEEE] px-5 py-4">
              <p className="text-xs text-[#9B9B9B]">
                Phone Number
              </p>

              <p className="mt-1 text-sm font-medium text-[#181725]">
                {phone}
              </p>
            </div>

            <div className="px-5 py-4">
              <p className="text-xs text-[#9B9B9B]">
                Sign-in Method
              </p>

              <p className="mt-1 text-sm font-medium text-[#181725]">
                {provider}
              </p>
            </div>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-[#9B9B9B]">
          Account information is provided by your
          authentication profile.
        </p>
      </div>
    </div>
  )
}

export default AccountDetails