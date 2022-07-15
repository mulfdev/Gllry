import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ImgLoadingError from './images/ImgLoadingError'
import LoadingSpinner from './images/LoadingSpinner'

interface Props {
  nft: any
  setSelectedNft: Dispatch<SetStateAction<any>>
}

const Gallery = ({ nft, setSelectedNft }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (nft.metadata?.contentType?.startsWith('video')) {
      setIsLoading(false)
      return
    }
    const img = new Image()
    img.src = nft.metadata?.image
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsError(true)
    }
  }, [nft.metadata?.image, nft.metadata?.contentType])

  if (nft.metadata?.contentType?.startsWith('video')) {
    return (
      <div
        key={nft.local_id}
        className=" overflow-hidden shadow rounded-lg drop-shadow-md cursor-pointer transition ease-in-out delay-50 hover:drop-shadow-lg"
      >
        <div className="overflow-hidden md:min-h-[400px] md:max-h-[700px] flex items-center justify-center">
          <li
            className="relative"
            onClick={() => {
              if (isLoading) return
              setSelectedNft(nft)
            }}
          >
            <div className="relative">
              <div
                className={
                  isLoading
                    ? 'absolute backdrop-blur-xs bottom-0 py-10 text-center w-full h-full bg-gray-800/20 opacity-0 transition-opacity duration-200 ease-linear hover:opacity-100'
                    : ''
                }
              ></div>
              <video
                className="mx-6-auto min-w-[385px]"
                autoPlay
                loop
                muted
                controls={false}
              >
                <source src={nft.metadata?.image} />
              </video>
            </div>
          </li>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div
        key={nft.local_id}
        className=" overflow-hidden shadow rounded-lg drop-shadow-md transition ease-in-out delay-50 hover:drop-shadow-lg"
      >
        <div className="overflow-hidden md:min-h-[400px] md:max-h-[700px] flex items-center justify-center">
          {isError ? <ImgLoadingError /> : <LoadingSpinner />}
        </div>
      </div>
    )
  }

  return (
    <div
      key={nft.local_id}
      className=" overflow-hidden shadow rounded-lg drop-shadow-md cursor-pointer transition ease-in-out delay-50 hover:drop-shadow-lg"
    >
      <div className="overflow-hidden md:min-h-[400px] md:max-h-[800px] flex items-center justify-center">
        <li
          className="relative"
          onClick={() => {
            setSelectedNft(nft)
          }}
        >
          <div className="relative">
            <div
              className={
                'absolute backdrop-blur-xs bottom-0 py-10 text-center w-full h-full bg-gray-800/20 opacity-0 transition-opacity duration-200 ease-linear hover:opacity-100'
              }
            >
              <div className="text-white text-3xl font-bold absolute w-full text-center">
                {nft.metadata?.name}
              </div>
            </div>
            <img
              src={nft.metadata?.image}
              alt="nft"
              className="mx-6-auto min-w-[385px]"
              loading="lazy"
            />
          </div>
        </li>
      </div>
    </div>
  )
}

export default Gallery
