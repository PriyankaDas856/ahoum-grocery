import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UserLocation = {
  city: string
  area: string
  country?: string
}

function getSavedLocation(): UserLocation | null {
  const storedLocation =
    localStorage.getItem('userLocation')

  if (!storedLocation) {
    return null
  }

  try {
    const parsed: unknown =
      JSON.parse(storedLocation)

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'city' in parsed &&
      'area' in parsed &&
      typeof parsed.city === 'string' &&
      typeof parsed.area === 'string'
    ) {
      const country =
        'country' in parsed &&
        typeof parsed.country === 'string'
          ? parsed.country
          : undefined

      return {
        city: parsed.city,
        area: parsed.area,
        country,
      }
    }
  } catch {
    return null
  }

  return null
}

function DeliveryAddress() {
  const navigate = useNavigate()

  const [location] = useState<UserLocation | null>(
    getSavedLocation,
  )

  const locationText = location
    ? `${location.area}, ${location.city}${
        location.country
          ? `, ${location.country}`
          : ''
      }`
    : null

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
            Delivery Address
          </h1>
        </header>

        {location ? (
          <main className="mt-7">
            {/* Saved address */}
            <section className="rounded-2xl border border-[#EEEEEE] bg-white p-5">
              <div className="flex items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-xl text-[#7C4DFF]">
                  ♧
                </div>

                <div className="ml-4 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[#181725]">
                      Delivery Location
                    </h2>

                    <span className="rounded-full bg-[#EAF6ED] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#53B175]">
                      Saved
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#7C7C7C]">
                    {locationText}
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery information */}
            <section className="mt-4 rounded-2xl bg-[#F2F8F3] p-5">
              <h3 className="text-sm font-semibold text-[#181725]">
                Delivery information
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#7C7C7C]">
                Your saved location is used to
                determine the delivery area during
                grocery shopping and checkout.
              </p>
            </section>

            {/* Change location */}
            <button
              type="button"
              onClick={() =>
                navigate('/auth/location')
              }
              className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#53B175] py-3.5 text-sm font-semibold text-[#53B175] transition hover:bg-[#F2F8F3]"
            >
              Change Delivery Location
            </button>
          </main>
        ) : (
          <main className="mt-16 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3EEFF] text-4xl">
              ♧
            </div>

            <h2 className="mt-6 text-lg font-semibold text-[#181725]">
              No address saved
            </h2>

            <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#7C7C7C]">
              Add a delivery location so we know
              where to deliver your groceries.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate('/auth/location')
              }
              className="mt-7 rounded-xl bg-[#53B175] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#47A568]"
            >
              Add Delivery Location
            </button>
          </main>
        )}
      </div>
    </div>
  )
}

export default DeliveryAddress