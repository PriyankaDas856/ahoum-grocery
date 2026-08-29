import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useCartStore } from '../stores/cartStore'
import { useFavouriteStore } from '../stores/favouriteStore'

type UserLocation = {
  city: string
  area: string
  country?: string
}

type FAQ = {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'orders',
    question: 'Where is my order?',
    answer:
      'You can check your order status from the Orders section after placing an order. Your order status will be updated as it moves through the delivery process.',
  },
  {
    id: 'delivery',
    question: 'What are the delivery options?',
    answer:
      'Available delivery options are shown during checkout based on your selected delivery location.',
  },
  {
    id: 'payment',
    question: 'What payment methods are available?',
    answer:
      'Available payment methods are displayed during checkout before you place your order.',
  },
  {
    id: 'address',
    question: 'How do I change my delivery address?',
    answer:
      'Open Delivery Address from your account to review or update your saved delivery location.',
  },
  {
    id: 'favourites',
    question: 'How do I save a product?',
    answer:
      'Open a product and use the favourite option to save it. Your saved products appear in Favourites.',
  },
  {
    id: 'cart',
    question: 'Can I change my cart before checkout?',
    answer:
      'Yes. You can add or remove products and adjust quantities from your cart before placing an order.',
  },
]

function getSavedLocation(): UserLocation | null {
  const storedLocation = localStorage.getItem(
    'userLocation',
  )

  if (!storedLocation) {
    return null
  }

  try {
    const parsedLocation: unknown =
      JSON.parse(storedLocation)

    if (
      typeof parsedLocation === 'object' &&
      parsedLocation !== null &&
      'city' in parsedLocation &&
      'area' in parsedLocation &&
      typeof parsedLocation.city === 'string' &&
      typeof parsedLocation.area === 'string'
    ) {
      const country =
        'country' in parsedLocation &&
        typeof parsedLocation.country === 'string'
          ? parsedLocation.country
          : undefined

      return {
        city: parsedLocation.city,
        area: parsedLocation.area,
        country,
      }
    }
  } catch {
    localStorage.removeItem('userLocation')
  }

  return null
}

function Account() {
  const navigate = useNavigate()

  const cartItems = useCartStore(
    (state) => state.items,
  )

  const favouriteItems = useFavouriteStore(
    (state) => state.items,
  )

  const [user, setUser] = useState<User | null>(null)

  const [location] = useState<UserLocation | null>(
    getSavedLocation,
  )

  const [showHelp, setShowHelp] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const [openFaq, setOpenFaq] = useState<string | null>(
    null,
  )

  const [loggingOut, setLoggingOut] = useState(false)

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
    user?.displayName?.trim() ||
    (user?.email
      ? user.email.split('@')[0]
      : null) ||
    'Ahoum User'

  const contactInformation =
    user?.email ||
    user?.phoneNumber ||
    'No contact information'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase(),
    )
    .join('')

  const locationText = location
    ? `${location.area}, ${location.city}${
        location.country
          ? `, ${location.country}`
          : ''
      }`
    : 'No delivery address saved'

  const handleLogout = async () => {
    setLoggingOut(true)

    try {
      await signOut(auth)

      localStorage.removeItem('userLocation')

      navigate('/welcome', {
        replace: true,
      })
    } catch (error: unknown) {
      console.error('Logout failed:', error)
      setLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 pb-10 pt-6 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-[740px]">

        {/* Page heading */}
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-[#181725]">
            Account
          </h1>
        </header>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">
          <div className="flex items-center p-5">

            {/* Avatar */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#53B175] text-xl font-semibold text-white shadow-sm">
                {initials || 'A'}
              </div>
            )}

            {/* User information */}
            <div className="ml-4 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-[#181725]">
                  {displayName}
                </h2>

                <span className="rounded-full bg-[#EAF6ED] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#53B175]">
                  Member
                </span>
              </div>

              <p className="mt-1 truncate text-xs text-[#7C7C7C]">
                {contactInformation}
              </p>
            </div>

            {/* Edit */}
            <Link
              to="/account/details"
              aria-label="Edit account details"
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F5F5] text-[#7C7C7C] transition hover:bg-[#EEEEEE]"
            >
              ✎
            </Link>
          </div>

          {/* Account statistics */}
          <div className="grid grid-cols-3 border-t border-[#EEEEEE] bg-[#FAFAFA]">
            <div className="py-4 text-center">
              <p className="text-lg font-semibold text-[#181725]">
                0
              </p>

              <p className="mt-0.5 text-xs text-[#7C7C7C]">
                Orders
              </p>
            </div>

            <div className="border-x border-[#EEEEEE] py-4 text-center">
              <p className="text-lg font-semibold text-[#181725]">
                {favouriteItems.length}
              </p>

              <p className="mt-0.5 text-xs text-[#7C7C7C]">
                Favourites
              </p>
            </div>

            <div className="py-4 text-center">
              <p className="text-lg font-semibold text-[#181725]">
                {location ? 1 : 0}
              </p>

              <p className="mt-0.5 text-xs text-[#7C7C7C]">
                Address
              </p>
            </div>
          </div>
        </section>

        {/* Account options */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white">

          {/* Orders */}
          <Link
            to="/orders"
            className="flex items-center border-b border-[#EEEEEE] px-5 py-4 transition hover:bg-[#FAFAFA]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF9F2] text-[#00B894]">
              🛍
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Orders
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                Recent deliveries & status
              </p>
            </div>

            <span className="text-xl text-[#9B9B9B]">
              ›
            </span>
          </Link>

          {/* My Details */}
          <Link
            to="/account/details"
            className="flex items-center border-b border-[#EEEEEE] px-5 py-4 transition hover:bg-[#FAFAFA]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#4C8BF5]">
              ♙
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                My Details
              </p>

              <p className="mt-1 truncate text-xs text-[#9B9B9B]">
                {contactInformation}
              </p>
            </div>

            <span className="text-xl text-[#9B9B9B]">
              ›
            </span>
          </Link>

          {/* Delivery Address */}
          <Link
            to="/account/address"
            className="flex items-center border-b border-[#EEEEEE] px-5 py-4 transition hover:bg-[#FAFAFA]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#7C4DFF]">
              ♧
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Delivery Address
              </p>

              <p className="mt-1 truncate text-xs text-[#9B9B9B]">
                {locationText}
              </p>
            </div>

            <span className="text-xl text-[#9B9B9B]">
              ›
            </span>
          </Link>

          {/* Payment Methods */}
          <div className="flex items-center border-b border-[#EEEEEE] px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF9FC] text-[#00A8CC]">
              ▭
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Payment Methods
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                No payment method saved
              </p>
            </div>

            <span className="text-xl text-[#B0B0B0]">
              ›
            </span>
          </div>

          {/* Promo */}
          <Link
            to="/checkout"
            className="flex items-center border-b border-[#EEEEEE] px-5 py-4 transition hover:bg-[#FAFAFA]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#F4A400]">
              ◇
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Promo Card
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                Available discounts & offers
              </p>
            </div>

            <span className="text-xl text-[#9B9B9B]">
              ›
            </span>
          </Link>

          {/* Notifications */}
          <button
            type="button"
            className="flex w-full items-center border-b border-[#EEEEEE] px-5 py-4 text-left transition hover:bg-[#FAFAFA]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F6] text-[#E83E8C]">
              ♧
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Notifications
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                Orders & promotional alerts
              </p>
            </div>

            <span className="text-xl text-[#9B9B9B]">
              ›
            </span>
          </button>

          {/* Help & Support */}
          <button
            type="button"
            onClick={() =>
              setShowHelp((current) => !current)
            }
            className="flex w-full items-center border-b border-[#EEEEEE] px-5 py-4 text-left transition hover:bg-[#FAFAFA]"
            aria-expanded={showHelp}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF9ED] text-[#19A95A]">
              ?
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                Help & Support
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                FAQs, orders, payments & delivery
              </p>
            </div>

            <span
              className={`text-xl text-[#9B9B9B] transition-transform ${
                showHelp ? 'rotate-90' : ''
              }`}
            >
              ›
            </span>
          </button>

          {/* Help content */}
          {showHelp && (
            <div className="border-b border-[#EEEEEE] bg-[#FAFAFA] px-5 pb-5 pt-3">
              <div className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">
                {faqs.map((faq) => {
                  const isOpen =
                    openFaq === faq.id

                  return (
                    <div
                      key={faq.id}
                      className="border-b border-[#EEEEEE] last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(
                            isOpen
                              ? null
                              : faq.id,
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 text-xs font-medium text-[#181725]">
                          {faq.question}
                        </span>

                        <span
                          className={`shrink-0 text-lg text-[#9B9B9B] transition-transform ${
                            isOpen
                              ? 'rotate-90'
                              : ''
                          }`}
                        >
                          ›
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-xs leading-5 text-[#7C7C7C]">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-3 rounded-xl bg-[#F2F8F3] p-4">
                <p className="text-sm font-semibold text-[#181725]">
                  Still need help?
                </p>

                <p className="mt-1 text-xs leading-5 text-[#7C7C7C]">
                  Find answers to common questions
                  about orders, delivery, payments,
                  and your account.
                </p>

                <button
                  type="button"
                  className="mt-3 rounded-lg bg-[#53B175] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#47A568]"
                >
                  Contact Support
                </button>
              </div>
            </div>
          )}

          {/* About */}
          <button
            type="button"
            onClick={() =>
              setShowAbout((current) => !current)
            }
            className="flex w-full items-center px-5 py-4 text-left transition hover:bg-[#FAFAFA]"
            aria-expanded={showAbout}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F3F7] text-[#657184]">
              ⓘ
            </div>

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#181725]">
                About
              </p>

              <p className="mt-1 text-xs text-[#9B9B9B]">
                Ahoum Grocery · Version 1.0.0
              </p>
            </div>

            <span
              className={`text-xl text-[#9B9B9B] transition-transform ${
                showAbout ? 'rotate-90' : ''
              }`}
            >
              ›
            </span>
          </button>

          {/* About content */}
          {showAbout && (
            <div className="border-t border-[#EEEEEE] bg-[#FAFAFA] px-5 pb-5 pt-4">

              {/* App information */}
              <div className="rounded-2xl bg-[#F2F8F3] p-5 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#53B175] text-2xl font-bold text-white">
                  A
                </div>

                <h3 className="mt-3 text-base font-semibold text-[#181725]">
                  Ahoum Grocery
                </h3>

                <p className="mx-auto mt-1 max-w-[320px] text-xs leading-5 text-[#7C7C7C]">
                  A grocery shopping application
                  designed to make discovering
                  products, managing your cart, and
                  placing grocery orders simple and
                  convenient.
                </p>

                <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-[#53B175]">
                  Fresh groceries · Simple shopping
                </p>
              </div>

              {/* App information list */}
              <div className="mt-3 overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">

                {/* Version */}
                <div className="flex items-center justify-between border-b border-[#EEEEEE] px-4 py-3.5">
                  <span className="text-xs text-[#7C7C7C]">
                    App Version
                  </span>

                  <span className="text-xs font-medium text-[#181725]">
                    1.0.0
                  </span>
                </div>

                {/* Terms */}
                <button
                  type="button"
                  onClick={() =>
                    setShowTerms(
                      (current) => !current,
                    )
                  }
                  className="flex w-full items-center justify-between border-b border-[#EEEEEE] px-4 py-3.5 text-left transition hover:bg-[#FAFAFA]"
                  aria-expanded={showTerms}
                >
                  <span className="text-xs text-[#181725]">
                    Terms & Conditions
                  </span>

                  <span
                    className={`text-lg text-[#9B9B9B] transition-transform ${
                      showTerms
                        ? 'rotate-90'
                        : ''
                    }`}
                  >
                    ›
                  </span>
                </button>

                {/* Terms content */}
                {showTerms && (
                  <div className="border-b border-[#EEEEEE] bg-[#FAFAFA] px-4 py-4">
                    <h4 className="text-xs font-semibold text-[#181725]">
                      Terms & Conditions
                    </h4>

                    <p className="mt-2 text-[11px] leading-5 text-[#7C7C7C]">
                      By using Ahoum Grocery, you
                      agree to use the application for
                      personal grocery shopping and to
                      provide accurate information when
                      using account and delivery
                      features.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      Product availability, prices,
                      offers, and delivery information
                      may change. The information shown
                      during checkout should be reviewed
                      before placing an order.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      Orders may be unavailable or
                      require changes if products become
                      out of stock or the selected
                      delivery location cannot be served.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      Ahoum Grocery may update these
                      terms when application features or
                      services change.
                    </p>

                    <p className="mt-3 text-[10px] text-[#B0B0B0]">
                      Last updated: August 2026
                    </p>
                  </div>
                )}

                {/* Privacy */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPrivacy(
                      (current) => !current,
                    )
                  }
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-[#FAFAFA]"
                  aria-expanded={showPrivacy}
                >
                  <span className="text-xs text-[#181725]">
                    Privacy Policy
                  </span>

                  <span
                    className={`text-lg text-[#9B9B9B] transition-transform ${
                      showPrivacy
                        ? 'rotate-90'
                        : ''
                    }`}
                  >
                    ›
                  </span>
                </button>

                {/* Privacy content */}
                {showPrivacy && (
                  <div className="border-t border-[#EEEEEE] bg-[#FAFAFA] px-4 py-4">
                    <h4 className="text-xs font-semibold text-[#181725]">
                      Privacy Policy
                    </h4>

                    <p className="mt-2 text-[11px] leading-5 text-[#7C7C7C]">
                      Ahoum Grocery may use information
                      such as your account details,
                      authentication information,
                      delivery location, cart data, and
                      order information to provide the
                      application's shopping features.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      When you sign in using an
                      authentication provider, the
                      application receives the account
                      information made available by that
                      provider.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      Some shopping information may be
                      stored locally in your browser so
                      that your cart, favourites, or
                      delivery preferences can remain
                      available between sessions.
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-[#7C7C7C]">
                      Information is used to support the
                      application's core grocery shopping
                      functionality and is not requested
                      unnecessarily.
                    </p>

                    <p className="mt-3 text-[10px] text-[#B0B0B0]">
                      Last updated: August 2026
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 text-center text-[10px] text-[#B0B0B0]">
                © 2026 Ahoum Grocery
              </p>
            </div>
          )}
        </section>

        {/* Cart status */}
        {cartItems.length > 0 && (
          <Link
            to="/cart"
            className="mt-5 flex items-center justify-between rounded-2xl bg-[#F2F8F3] px-5 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-[#181725]">
                You have items in your cart
              </p>

              <p className="mt-1 text-xs text-[#7C7C7C]">
                {cartItems.length} product
                {cartItems.length === 1
                  ? ''
                  : 's'}{' '}
                waiting for checkout
              </p>
            </div>

            <span className="text-xl text-[#53B175]">
              ›
            </span>
          </Link>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-5 flex w-full items-center justify-center rounded-2xl border border-[#FFE0E0] bg-[#FFF4F4] py-4 text-sm font-semibold text-[#FF3B30] transition hover:bg-[#FFEEEE] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOut
            ? 'Logging Out...'
            : 'Log Out'}
        </button>
      </div>
    </div>
  )
}

export default Account