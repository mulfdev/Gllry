/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import Pusher from 'pusher-js'
import { supabase } from '../utils/supabaseClient'

import { useNetwork } from 'wagmi'

const pusher = new Pusher('fe24b78a961219eb9328', {
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string
})

const useFetchNfts = (address: string | undefined) => {
  const { activeChain } = useNetwork()
  const [selectedNft, setSelectedNft] = useState()
  const [nftList, setNftList] = useState<any>({
    data: null,
    message: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof address === 'undefined' || activeChain?.name !== 'Ethereum') {
      setSelectedNft(undefined)
      setNftList([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    ;(async () => {
      try {
        const dbData = await supabase.from('nfts').select('*').eq('owner', address)

        if (dbData) {
          setNftList({ data: dbData.data })
        }
        if (dbData?.data?.length === 0) {
          const res = await fetch('/api/addUser', {
            method: 'POST',
            body: JSON.stringify({ address: address })
          })
          const data = await res.json()
          setNftList({ data: data.nftData })
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [address, activeChain?.name])

  useEffect(() => {
    if (typeof address === 'undefined' || activeChain?.name !== 'Ethereum') return

    const channel = pusher.subscribe('metadata-update')
    channel.bind('process-complete', async () => {
      const dbData = await supabase
        .from('nfts')
        .select('*')
        .eq('owner', address)
        .limit(50)

      setNftList({ data: dbData.data })
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [address])

  return {
    nftList,
    isLoading,
    selectedNft,
    setSelectedNft
  }
}
export default useFetchNfts
