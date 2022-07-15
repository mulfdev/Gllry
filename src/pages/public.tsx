import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const Header = dynamic(() => import('../components/Header'))

export default function HomePage() {
  const router = useRouter()

  const [searchAddress, setSearchAddress] = useState('')

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value)
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="h-full pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="mx-w-5xl flex flex-col justify-center items-center mt-24">
          <div className="w-full md:w-[46ch]">
            <label
              htmlFor="eth-address"
              className="block text-lg font-medium text-gray-700"
            >
              Wallet Address
            </label>

            <div className="mt-1 mb-6">
              <input
                type="text"
                name="eth-address"
                className="h-12 shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-md border-gray-300 rounded-md text-center"
                placeholder="0xA.."
                value={searchAddress}
                onChange={inputHandler}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => {
              router.push(`/u/${searchAddress}`)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-900"
          >
            Search
          </button>
        </div>
      </div>
    </main>
  )
}
