import got from 'got'
import Pusher from 'pusher'
import { Nft } from '../components/NftDetails'
import { supabase } from './supabaseClient'

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string
})

export default async function processMetadata(nfts: Nft[]) {
  const pushData = await Promise.all(
    nfts.map(async (nft: Nft) => {
      if (nft.metadata.image?.startsWith('http')) {
        try {
          const metadataReq = await got(nft.metadata.image, {
            method: 'HEAD',
            retry: {
              limit: 2
            },
            timeout: {
              request: 900
            }
          })

          return {
            metadata: {
              ...nft.metadata,
              contentType: metadataReq.headers['content-type']
            },
            contract: nft.contract,
            owner: nft.owner
          }
        } catch (error) {
          return {
            metadata: {
              ...nft.metadata
            },
            contract: nft.contract,
            owner: nft.owner
          }
        }
      } else {
        return {
          metadata: { ...nft.metadata },
          contract: nft.contract,
          owner: nft.owner
        }
      }
    })
  )

  await supabase.from('nfts').insert(pushData)
  pusher.trigger('metadata-update', 'process-complete', {
    message: 'done'
  })

  return pushData
}
