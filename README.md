![Gllry](https://i.imgur.com/S5LQkst.png)

Gllry is a place for you to experience _your_ NFT Collection. The initial scope of Gllry is limited in order to give you the best experience possible. NFT data consistency is somewhat convoluted at this time. Best efforts are made to normalize metadata for supported content types. This project uses [Moralis NFT API](https://docs.moralis.io/moralis-dapp/web3-api/nft-api) as it's datasource. 

The backend (using Next.js serverless functions) fetches the data from the provider. From there, if the NFT API doesn't return any metadata for the token, a HTTP request is sent to the token_uri provided by Moralis. This data is parsed, filtered, and vaildated so it can be rendered by the front-end.

> Only images and videos are supported. Any other content types will not be displayed in your Gllry

The metadata processing is a non-blocking operation. The user is initially shown a subset of the tokens in the wallet. A websocket is opened via Pusher which triggers a refetch when the back-end operation is complete and the gallery is enhanced to show more tokens.

Once the transformations are complete, the formatted data is stored in a Postgres database. A cron job manages data freshness by deleting the rows in the table every 12 hours. The data is backfilled the next time the user logs in.

## **_Using Gllry_**

1. Connect your wallet (only supports MetaMask, may work with others)
2. View your Gllry under "My Collection"
3. Search for other wallet's Gllry via "Galleries"

## **_My Collection_**

View the 50 most recent items in your collection.

_Select "My Collection" In The Navbar_

![My Collection Button](https://i.imgur.com/lySLOX6.png)

_\*note that the number of items shown may be less than 50 if your wallet contains unsupported content types_

## **_Public Galleries_**

Public Galleries are where you experience everyone else's collection. It is a way to view NFTs stored at the wallet address provided.

_Select "Galleries" In The Navbar_

![public](https://i.imgur.com/CdFZZkj.png)
