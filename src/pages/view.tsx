import dynamic from 'next/dynamic'

import { useAccount } from 'wagmi'
import useFetchNfts from '../hooks/useFetchNfts'

const Gallery = dynamic(() => import('../components/Gallery'), {
  ssr: false
})

const NftDetails = dynamic(() => import('../components/NftDetails'))

const ViewMyNfts = () => {
  const { data: account } = useAccount()

  const { nftList, isLoading, setSelectedNft, selectedNft } = useFetchNfts(
    account?.address
  )

  return (
    <>
      <Gallery
        nftList={nftList?.data}
        setSelectedNft={setSelectedNft}
        isLoading={isLoading}
      />

      {selectedNft.owner !== undefined && <NftDetails selectedNft={selectedNft} />}
    </>
  )
}
export default ViewMyNfts
