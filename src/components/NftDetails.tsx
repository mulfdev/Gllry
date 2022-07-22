export interface Nft {
  local_id?: Readonly<string>;
  owner: string
  contract: string
  last_metadata_sync?: string
  token_uri?: string
  metadata: {
    description: string
    name: string
    image: string
    contentType: string
    animation_url?: string
    attributes: [
      {
        value: string
        trait_type: string
      }
    ]
  }
}

interface Props {
  selectedNft: Nft
}
const NftDetails = ({ selectedNft }: Props) => {
  return (
    <aside className="hidden min-w-[24rem] w-1/5 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
      <div className="block min-w-fit rounded-lg overflow-hidden drop-shadow-lg bg-white mx-auto md:min-h-[100px] md:max-h-[800px]">
        {selectedNft.metadata?.contentType?.startsWith('video') ? (
          <video className="mx-auto w-fit" autoPlay loop muted controls={false}>
            <source src={selectedNft.metadata?.image} />
          </video>
        ) : (
          <img
            src={selectedNft.metadata?.image}
            alt="nft image"
            className="m-auto md:min-h-[100px] md:max-h-[800px]"
          />
        )}
      </div>

      <div>
        <h3 className="mt-4 font-medium text-gray-900 text-xl">
          {selectedNft.metadata?.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-500 italic break-words overflow-x-hidden">
            {selectedNft.metadata?.description}
          </p>
        </div>
      </div>
      <div>
        <div className="mt-4 pt-2  border-t border-gray-200">
          {Array.isArray(selectedNft.metadata?.attributes) &&
            selectedNft.metadata?.attributes?.map((attr) => {
              return (
                <span
                  key={attr.trait_type + Math.random()}
                  className="text-sm text-gray-500 italic block mt-2"
                >
                  <em className="font-semibold">{attr?.trait_type}</em> : {attr?.value}
                </span>
              )
            })}
        </div>
      </div>
    </aside>
  )
}

export default NftDetails
