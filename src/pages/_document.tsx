import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full bg-gray-50 subpixel-antialiased">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="h-full bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
