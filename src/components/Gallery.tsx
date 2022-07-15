import { animated, useSpring } from '@react-spring/web'
import { Dispatch, SetStateAction } from 'react'
import Masonry from 'react-masonry-css'
import { useAccount } from 'wagmi'

import GalleryItem from './GalleryItem'
import Header from './Header'
import Connect from './images/Connect'
import EmptyResult from './images/EmptyResult'
import LoadingSpinner from './images/LoadingSpinner'

import type { Nft } from './NftDetails'

interface Props {
  nftList: Nft[]
  setSelectedNft: Dispatch<SetStateAction<undefined>>
  isLoading: boolean
}

const PersonalGallery = ({ nftList, setSelectedNft, isLoading }: Props) => {
  const { data: account } = useAccount()
  const springProps = useSpring({ opacity: isLoading ? 0 : 1, delay: 400 })

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        {isLoading && (
          <div className="flex justify-center mt-32">
            <LoadingSpinner />
          </div>
        )}
        <section
          className="mx-auto mt-8 pb-16 max-w-5xl"
          aria-labelledby="gallery-heading"
        >
          <ul role="list">
            {typeof account?.address === 'undefined' && !isLoading && (
              <>
                <h1 className="text-center w-full text-4xl md:text-5xl my-16">
                  Please Connect Your Wallet
                </h1>
                <Connect />
              </>
            )}
            {nftList?.length > 0 && !isLoading && (
              <animated.div style={springProps}>
                <Masonry
                  breakpointCols={{ default: 2, 1200: 1 }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {nftList.map((nft: any) => {
                    return (
                      <GalleryItem
                        key={nft.local_id}
                        nft={nft}
                        setSelectedNft={setSelectedNft}
                      />
                    )
                  })}
                </Masonry>
              </animated.div>
            )}

            {nftList?.length === 0 && !isLoading && <EmptyResult />}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default PersonalGallery
