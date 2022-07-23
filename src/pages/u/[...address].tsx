import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Gallery = dynamic(() => import('../../components/Gallery'), { ssr: false })
const NftDetails = dynamic(() => import('../../components/NftDetails'))

import useFetchNfts from '../../hooks/useFetchNfts'

function GetNftsByAddress() {
  const router = useRouter()

  const { address } = router.query

  const { nftList, isLoading, selectedNft, setSelectedNft } = useFetchNfts(
    address?.toString()
  )

  return (
    <>
      <Gallery
        nftList={nftList?.data}
        setSelectedNft={setSelectedNft}
        isLoading={isLoading}
      />

      {selectedNft?.owner !== undefined && <NftDetails selectedNft={selectedNft} />}
    </>
  )
}

export default GetNftsByAddress
