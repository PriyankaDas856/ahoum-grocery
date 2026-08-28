import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type LocationData = Record<string, string[]>

const locations: LocationData = {
  Delhi: [
    'Saket',
    'Dwarka',
    'Rohini',
    'Lajpat Nagar',
    'Vasant Kunj',
    'Karol Bagh',
    'Connaught Place',
    'Janakpuri',
    'Greater Kailash',
    'Rajouri Garden',
  ],

  Mumbai: [
    'Andheri',
    'Bandra',
    'Powai',
    'Borivali',
    'Dadar',
    'Goregaon',
    'Malad',
    'Chembur',
    'Worli',
    'Colaba',
  ],

  Bengaluru: [
    'Whitefield',
    'Koramangala',
    'Indiranagar',
    'HSR Layout',
    'Jayanagar',
    'Marathahalli',
    'Electronic City',
    'Hebbal',
    'BTM Layout',
    'Yelahanka',
  ],

  Kolkata: [
    'Salt Lake',
    'New Town',
    'Park Street',
    'Ballygunge',
    'Garia',
    'Behala',
    'Dum Dum',
    'Alipore',
    'Rajarhat',
    'Jadavpur',
  ],

  Chennai: [
    'Adyar',
    'Anna Nagar',
    'T Nagar',
    'Velachery',
    'Guindy',
    'Porur',
    'Tambaram',
    'OMR',
    'Mylapore',
    'Nungambakkam',
  ],

  Hyderabad: [
    'Banjara Hills',
    'Jubilee Hills',
    'Gachibowli',
    'Hitech City',
    'Madhapur',
    'Kondapur',
    'Kukatpally',
    'Secunderabad',
    'Begumpet',
    'Manikonda',
  ],

  Pune: [
    'Kothrud',
    'Viman Nagar',
    'Hinjewadi',
    'Baner',
    'Wakad',
    'Hadapsar',
    'Kharadi',
    'Aundh',
    'Koregaon Park',
    'Pimple Saudagar',
  ],

  Ahmedabad: [
    'Satellite',
    'Bodakdev',
    'Navrangpura',
    'Vastrapur',
    'Maninagar',
    'Chandkheda',
    'Prahlad Nagar',
    'Thaltej',
    'Bopal',
    'Gota',
  ],

  Jaipur: [
    'Malviya Nagar',
    'Vaishali Nagar',
    'C Scheme',
    'Mansarovar',
    'Jagatpura',
    'Tonk Road',
    'Raja Park',
    'Sodala',
    'Shyam Nagar',
    'Durgapura',
  ],

  Lucknow: [
    'Gomti Nagar',
    'Hazratganj',
    'Aliganj',
    'Indira Nagar',
    'Alambagh',
    'Mahanagar',
    'Vikas Nagar',
    'Chinhat',
    'Faizabad Road',
    'Sushant Golf City',
  ],

  Chandigarh: [
    'Sector 17',
    'Sector 22',
    'Sector 34',
    'Sector 35',
    'Sector 43',
    'Manimajra',
    'Zirakpur',
    'Mohali',
    'Panchkula',
    'Sector 15',
  ],

  Kochi: [
    'Edappally',
    'Kakkanad',
    'Vyttila',
    'Kaloor',
    'Fort Kochi',
    'Aluva',
    'Palarivattom',
    'Tripunithura',
    'Kadavanthra',
    'Marine Drive',
  ],

  Indore: [
    'Vijay Nagar',
    'Bhawarkua',
    'Palasia',
    'Rau',
    'Scheme 78',
    'Bengali Square',
    'Sudama Nagar',
    'Rajendra Nagar',
    'AB Road',
    'Mahalaxmi Nagar',
  ],

  Surat: [
    'Adajan',
    'Vesu',
    'Piplod',
    'Varachha',
    'Katargam',
    'Athwa',
    'Pal',
    'Dumas',
    'City Light',
    'Althan',
  ],

  Nagpur: [
    'Dharampeth',
    'Civil Lines',
    'Manish Nagar',
    'Wardha Road',
    'Sadar',
    'Bajaj Nagar',
    'Trimurti Nagar',
    'Mihan',
  ],

  Noida: [
    'Sector 18',
    'Sector 62',
    'Sector 75',
    'Sector 137',
    'Sector 150',
    'Sector 50',
    'Sector 76',
    'Greater Noida',
  ],

  Gurugram: [
    'DLF Phase 1',
    'DLF Phase 2',
    'DLF Phase 3',
    'Golf Course Road',
    'Sohna Road',
    'Sector 29',
    'Sector 49',
    'Sector 56',
  ],

  Coimbatore: [
    'RS Puram',
    'Gandhipuram',
    'Saibaba Colony',
    'Peelamedu',
    'Singanallur',
    'Race Course',
    'Saravanampatti',
    'Vadavalli',
  ],

  Visakhapatnam: [
    'MVP Colony',
    'Dwaraka Nagar',
    'Gajuwaka',
    'Madhurawada',
    'Seethammadhara',
    'Rushikonda',
    'Akkayyapalem',
    'Siripuram',
  ],

  Bhopal: [
    'Arera Colony',
    'MP Nagar',
    'Kolar Road',
    'Bawadia Kalan',
    'Shahpura',
    'Hoshangabad Road',
    'Misrod',
    'Ayodhya Bypass',
  ],

  Vadodara: [
    'Alkapuri',
    'Gotri',
    'Manjalpur',
    'Vasna',
    'Akota',
    'Karelibaug',
    'Waghodia Road',
    'Sayajigunj',
  ],

  Patna: [
    'Boring Road',
    'Kankarbagh',
    'Patliputra Colony',
    'Rajendra Nagar',
    'Bailey Road',
    'Danapur',
    'Fraser Road',
    'Ashiana Nagar',
  ],
}

function Location() {
  const navigate = useNavigate()

  const [selectedCity, setSelectedCity] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const [showCities, setShowCities] = useState(false)
  const [showAreas, setShowAreas] = useState(false)

  const cities = Object.keys(locations)

  const areas = selectedCity
    ? locations[selectedCity] ?? []
    : []

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setSelectedArea('')
    setShowCities(false)
    setShowAreas(false)
  }

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area)
    setShowAreas(false)
  }

  const handleSubmit = () => {
    if (!selectedCity || !selectedArea) {
      return
    }

    localStorage.setItem(
      'userLocation',
      JSON.stringify({
        city: selectedCity,
        area: selectedArea,
        country: 'India',
      }),
    )

    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-[600px] px-5 pb-8 pt-5 sm:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate('/auth/otp')}
          className="flex h-9 w-9 items-center justify-center text-3xl leading-none text-[#181725]"
          aria-label="Go back"
        >
          ‹
        </button>

        <main className="mt-6 sm:mt-10">
          {/* Illustration */}
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F2F8F3] text-5xl">
              📍
            </div>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <h1 className="text-[22px] font-semibold text-[#181725] sm:text-2xl">
              Select Your Location
            </h1>

            <p className="mx-auto mt-2 max-w-[330px] text-xs leading-5 text-[#7C7C7C] sm:text-sm">
              Choose your city and area so we can show
              groceries available near you.
            </p>
          </div>

          {/* City */}
          <section className="mt-10">
            <p className="text-xs text-[#9B9B9B]">
              Your City
            </p>

            <button
              type="button"
              onClick={() => {
                setShowCities((current) => !current)
                setShowAreas(false)
              }}
              className="flex w-full items-center justify-between border-b border-[#E2E2E2] py-3 text-left"
              aria-expanded={showCities}
            >
              <span
                className={
                  selectedCity
                    ? 'text-sm text-[#181725]'
                    : 'text-sm text-[#BDBDBD]'
                }
              >
                {selectedCity || 'Select your city'}
              </span>

              <span className="text-sm text-[#7C7C7C]">
                {showCities ? '⌃' : '⌄'}
              </span>
            </button>

            {/* City dropdown */}
            {showCities && (
              <div className="relative z-30">
                <div className="absolute left-0 right-0 mt-2 max-h-[280px] overflow-y-auto rounded-xl border border-[#E2E2E2] bg-white shadow-xl">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() =>
                        handleCitySelect(city)
                      }
                      className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                        selectedCity === city
                          ? 'bg-[#F2F8F3]'
                          : 'bg-white hover:bg-[#F8F8F8]'
                      }`}
                    >
                      <span className="text-sm text-[#181725]">
                        {city}
                      </span>

                      {selectedCity === city && (
                        <span className="font-bold text-[#53B175]">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Area */}
          <section className="mt-6">
            <p className="text-xs text-[#9B9B9B]">
              Your Area
            </p>

            <button
              type="button"
              disabled={!selectedCity}
              onClick={() => {
                if (!selectedCity) {
                  return
                }

                setShowAreas((current) => !current)
                setShowCities(false)
              }}
              className="flex w-full items-center justify-between border-b border-[#E2E2E2] py-3 text-left disabled:cursor-not-allowed"
              aria-expanded={showAreas}
            >
              <span
                className={
                  selectedArea
                    ? 'text-sm text-[#181725]'
                    : 'text-sm text-[#BDBDBD]'
                }
              >
                {selectedArea ||
                  (selectedCity
                    ? 'Select your area'
                    : 'Select city first')}
              </span>

              <span
                className={`text-sm ${
                  selectedCity
                    ? 'text-[#7C7C7C]'
                    : 'text-[#D0D0D0]'
                }`}
              >
                {showAreas ? '⌃' : '⌄'}
              </span>
            </button>

            {/* Area dropdown */}
            {showAreas && (
              <div className="relative z-20">
                <div className="absolute left-0 right-0 mt-2 max-h-[280px] overflow-y-auto rounded-xl border border-[#E2E2E2] bg-white shadow-xl">
                  {areas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() =>
                        handleAreaSelect(area)
                      }
                      className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                        selectedArea === area
                          ? 'bg-[#F2F8F3]'
                          : 'bg-white hover:bg-[#F8F8F8]'
                      }`}
                    >
                      <span className="text-sm text-[#181725]">
                        {area}
                      </span>

                      {selectedArea === area && (
                        <span className="font-bold text-[#53B175]">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Selected location */}
          {selectedCity && selectedArea && (
            <div className="mt-6 rounded-xl bg-[#F2F8F3] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  📍
                </div>

                <div>
                  <p className="text-[10px] text-[#7C7C7C]">
                    Delivery location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#181725]">
                    {selectedArea}, {selectedCity}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !selectedCity || !selectedArea
            }
            className="mt-7 w-full rounded-xl bg-[#53B175] py-4 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#D9D9D9]"
          >
            Continue
          </button>
        </main>
      </div>
    </div>
  )
}

export default Location