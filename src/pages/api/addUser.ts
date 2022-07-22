import type { NextApiRequest, NextApiResponse } from 'next'
import { Nft } from '../../components/NftDetails'
const IPFSGatewayTools = require('@pinata/ipfs-gateway-tools/dist/node')

import processMetadata from '../../utils/processMetadata'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ipfsTools = new IPFSGatewayTools()

  const dbData: Nft[] = []

  if (req.method !== 'POST' || typeof req.body === 'undefined') {
    return res.status(400).end()
  }
  const parsed = JSON.parse(req.body)

  try {
    const apiRes = await fetch(
      `https://deep-index.moralis.io/api/v2/${parsed.address}/nft?chain=eth&format=hex&limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NFT_API_KEY as string
        }
      }
    )
    const nfts = await apiRes.json()
    const mapUriToMetadata = await Promise.all(
      nfts.result?.map(async (nft: Nft) => {
        if (nft?.last_metadata_sync === null && nft?.token_uri?.startsWith('http')) {
          const res = await fetch(nft.token_uri)
          const data = await res.json()
          nft.metadata = data;
          return nft
        }
        return nft
      })
    )

    const filter = mapUriToMetadata.filter(
      (nft: any) => typeof nft?.metadata === 'string'
    )

    for await (const nft of filter) {
      const metadata = JSON.parse(nft.metadata)

      const isIpfsImg = metadata?.image?.startsWith('ipfs://')

      if (isIpfsImg) {
        const ipfsPrefix = 'https://ipfs.io/'
        const convertedUrl = ipfsTools.convertToDesiredGateway(metadata.image, ipfsPrefix)
        metadata.image = convertedUrl
      }

      if (metadata && nft.token_address) {
        dbData.push({
          contract: nft.token_address as string,
          metadata: metadata as Nft["metadata"],
          owner: parsed.address
        })
      }
    }

    processMetadata(dbData)
    console.log(dbData)

    return res.status(200).json({ message: 'user added', nftData: dbData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "could not add user's data" })
  }
}
