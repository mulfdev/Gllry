import dynamic from 'next/dynamic'

const ConnectWalletBtn = dynamic(() => import('./ConnectWalletBtn'), {
  ssr: false
})

const Header = () => {
  return (
    <div className="flex">
      <h1 className="flex-1 text-3xl font-bold text-gray-900">Gllry</h1>
      <div className="hidden md:block">
        <ConnectWalletBtn />
      </div>
    </div>
  )
}

export default Header
