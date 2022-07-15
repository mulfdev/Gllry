import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { WagmiConfig, configureChains, createClient, defaultChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import Layout from '../components/Layout'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId, pollingInterval: 5000 })
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  )
}

export default MyApp
