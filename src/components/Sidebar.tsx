import { PhotographIcon, GlobeIcon, HomeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = () => {
  const router = useRouter()

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      current: router.pathname === '/'
    },
    {
      name: 'My Collection',
      href: '/view',
      icon: PhotographIcon,
      current: router.pathname === '/view'
    },
    {
      name: 'Galleries',
      href: '/public',
      icon: GlobeIcon,
      current: router.pathname === '/public' || router.pathname === '/u/[...address]'
    }
  ]

  return (
    <div className="hidden w-28 bg-stone-900 overflow-y-auto lg:block">
      <div className="w-full py-6 flex flex-col items-center">
        <div className="flex-1 mt-6 w-full px-2 space-y-1">
          {navigation.map((item) => (
            <Link href={item.href} key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-stone-600 text-white'
                    : 'text-zinc-100 hover:bg-zinc-900 hover:text-white',
                  'group w-full p-3 rounded-md flex flex-col items-center text-sm font-medium text-center'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                <item.icon
                  className={classNames(
                    item.current ? 'text-white' : 'text-zinc-400 group-hover:text-white',
                    'h-8 w-8'
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
