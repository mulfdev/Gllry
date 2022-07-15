import dynamic from 'next/dynamic'
import GalleryImg from '../components/images/GalleryImg'

const Header = dynamic(() => import('../components/Header'))

import { useSpring, animated } from '@react-spring/web'

export default function HomePage() {
  const headerProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })
  const imgProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 700 })

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="h-full pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        <animated.h1
          style={headerProps}
          className="text-center w-full text-4xl md:text-5xl mt-16"
        >
          Welcome To Gllry
        </animated.h1>

        <animated.div style={imgProps}>
          <GalleryImg />
        </animated.div>
      </div>
    </main>
  )
}
