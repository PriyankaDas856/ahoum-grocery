import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../lib/phoneAuth'

type CountryOption = {
  name: string
  code: string
  flag: string
  digits: number
}

const countries: CountryOption[] = [
  {
    name: 'Bangladesh',
    code: '+880',
    flag: '🇧🇩',
    digits: 10,
  },
  {
    name: 'India',
    code: '+91',
    flag: '🇮🇳',
    digits: 10,
  },
  {
    name: 'United States',
    code: '+1',
    flag: '🇺🇸',
    digits: 10,
  },
  {
    name: 'United Kingdom',
    code: '+44',
    flag: '🇬🇧',
    digits: 10,
  },
  {
    name: 'United Arab Emirates',
    code: '+971',
    flag: '🇦🇪',
    digits: 9,
  },
  {
    name: 'Saudi Arabia',
    code: '+966',
    flag: '🇸🇦',
    digits: 9,
  },
  {
    name: 'Australia',
    code: '+61',
    flag: '🇦🇺',
    digits: 9,
  },
  {
    name: 'Canada',
    code: '+1',
    flag: '🇨🇦',
    digits: 10,
  },
  {
    name: 'Singapore',
    code: '+65',
    flag: '🇸🇬',
    digits: 8,
  },
]

function MobileNumber() {
  const navigate = useNavigate()

  const [selectedCountry, setSelectedCountry] =
    useState<CountryOption>(countries[0])

  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [showCountries, setShowCountries] =
    useState(false)

  const [sending, setSending] = useState(false)

  const handleContinue = async () => {
    const cleanedPhone = phone.replace(/\D/g, '')

    if (cleanedPhone.length !== selectedCountry.digits) {
      setError(
        `Please enter a valid ${selectedCountry.digits}-digit mobile number.`,
      )
      return
    }

    setError('')
    setSending(true)

    const fullPhoneNumber = `${selectedCountry.code}${cleanedPhone}`

    try {
      await sendOtp(fullPhoneNumber)

      navigate('/auth/otp', {
        state: {
          phone: fullPhoneNumber,
          country: selectedCountry.name,
          countryCode: selectedCountry.code,
        },
      })
    } catch (requestError: unknown) {
      console.error('Firebase OTP error:', requestError)

      if (
        requestError &&
        typeof requestError === 'object' &&
        'code' in requestError
      ) {
        const firebaseError = requestError as {
          code?: string
        }

        switch (firebaseError.code) {
          case 'auth/invalid-phone-number':
            setError(
              'This phone number is not valid.',
            )
            break

          case 'auth/too-many-requests':
            setError(
              'Too many attempts. Please try again later.',
            )
            break

          case 'auth/quota-exceeded':
            setError(
              'SMS limit reached. Please try again later.',
            )
            break

          case 'auth/operation-not-allowed':
            setError(
              'Phone authentication is not enabled in Firebase.',
            )
            break

          case 'auth/unauthorized-domain':
            setError(
              'This website is not authorized in Firebase.',
            )
            break

          case 'auth/captcha-check-failed':
            setError(
              'Security verification failed. Please try again.',
            )
            break

          default:
            setError(
              'Unable to send OTP. Please try again.',
            )
        }
      } else {
        setError(
          'Unable to send OTP. Please try again.',
        )
      }
    } finally {
      setSending(false)
    }
  }

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/\D/g, '')

    if (value.length <= selectedCountry.digits) {
      setPhone(value)
      setError('')
    }
  }

  const handleCountrySelect = (
    country: CountryOption,
  ) => {
    setSelectedCountry(country)
    setPhone('')
    setError('')
    setShowCountries(false)
  }

  return (
    <div className="min-h-screen bg-white px-5 pt-5">
      {/* Invisible Firebase reCAPTCHA */}
      <div id="recaptcha-container" />

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate('/auth')}
        className="flex h-8 w-8 items-center text-3xl leading-none text-[#181725]"
        aria-label="Back"
        disabled={sending}
      >
        ‹
      </button>

      <main className="mt-12">
        <h1 className="text-[22px] font-semibold text-[#181725]">
          Enter your mobile number
        </h1>

        <p className="mt-2 text-xs text-[#7C7C7C]">
          We&apos;ll send you a verification code
        </p>

        {/* Mobile Number */}
        <label
          htmlFor="mobile-number"
          className="mt-8 block text-xs font-medium text-[#7C7C7C]"
        >
          Mobile Number
        </label>

        <div
          className={`mt-2 flex items-center border-b pb-3 ${
            error
              ? 'border-red-400'
              : 'border-[#E2E2E2]'
          }`}
        >
          {/* Country selector */}
          <button
            type="button"
            onClick={() =>
              setShowCountries((current) => !current)
            }
            disabled={sending}
            className="flex shrink-0 items-center gap-2 pr-3 disabled:opacity-50"
            aria-label="Select country"
            aria-expanded={showCountries}
          >
            <span className="text-lg">
              {selectedCountry.flag}
            </span>

            <span className="text-sm text-[#181725]">
              {selectedCountry.code}
            </span>

            <span className="text-xs text-[#7C7C7C]">
              ⌄
            </span>
          </button>

          <div className="mr-3 h-5 w-px bg-[#E2E2E2]" />

          <input
            id="mobile-number"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !sending
              ) {
                handleContinue()
              }
            }}
            placeholder="Enter mobile number"
            maxLength={selectedCountry.digits}
            autoComplete="tel"
            autoFocus
            disabled={sending}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#181725] outline-none placeholder:text-[#BDBDBD] disabled:opacity-50"
          />
        </div>

        {/* Country dropdown */}
        {showCountries && !sending && (
          <div className="relative z-30">
            <div className="absolute left-0 right-0 mt-2 max-h-[300px] overflow-y-auto rounded-xl border border-[#E2E2E2] bg-white shadow-lg">
              {countries.map((country) => {
                const selected =
                  selectedCountry.name === country.name

                return (
                  <button
                    key={`${country.name}-${country.code}`}
                    type="button"
                    onClick={() =>
                      handleCountrySelect(country)
                    }
                    className={`flex w-full items-center justify-between px-4 py-3 text-left ${
                      selected
                        ? 'bg-[#F2F8F3]'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {country.flag}
                      </span>

                      <span className="text-sm text-[#181725]">
                        {country.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#7C7C7C]">
                        {country.code}
                      </span>

                      {selected && (
                        <span className="text-sm font-bold text-[#53B175]">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-xs text-red-500">
            {error}
          </p>
        )}

        {/* Counter */}
        {!error && phone.length > 0 && (
          <p className="mt-2 text-right text-[10px] text-[#9B9B9B]">
            {phone.length}/{selectedCountry.digits}
          </p>
        )}

        {/* Sending message */}
        {sending && (
          <p className="mt-4 text-xs text-[#53B175]">
            Sending verification code...
          </p>
        )}
      </main>

      {/* Continue */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={
          sending ||
          phone.length !== selectedCountry.digits
        }
        className="fixed bottom-6 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#53B175] text-3xl text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Continue"
      >
        {sending ? '…' : '›'}
      </button>
    </div>
  )
}

export default MobileNumber