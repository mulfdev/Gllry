import Head from "next/head"
import Sidebar from "./Sidebar"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="h-full flex">
        <Head>
          <title>Gllry</title>
          <meta property="og:title" content="Gllry" />
          <meta property="og:description" content="Experience Your Collection" />
          <meta property="og:url" content="https://gllry.xyz" />

          <meta property="og:image" content={'/og.jpg'} />
        </Head>
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
          {children}

          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
