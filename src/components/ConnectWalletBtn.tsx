import { useDisconnect, useConnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { chain, useNetwork } from 'wagmi'
import EthIcon from './images/EthIcon'
const ConnectWalletBtn = () => {
  const { data: account } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [chain.mainnet, chain.polygon]
    })
  })
  const { activeChain, chains, error, isLoading, pendingChainId, switchNetwork } =
    useNetwork()
  return (
    <div>
      {account?.address && !isLoading ? (
        <button
          onClick={() => {
            disconnect()
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-800"
        >
          {activeChain?.name === 'Ethereum' ? (
            <>
              <EthIcon /> Connected to {account?.address?.slice(0, 8)}
            </>
          ) : (
            'Unsupported Chain'
          )}
        </button>
      ) : (
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-stone-600 hover:bg-stone-900"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default ConnectWalletBtn
