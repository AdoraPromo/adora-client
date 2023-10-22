# Adora.Promo

The social media sponsorship industry is suffering from a lack of trust. Creators struggle to find legitimate offers and must trust advertisers to send timely payments. Meanwhile, advertisers need to verify that sponsored content meets their requirements and trust that audience engagement justifies their investment. This growing industry is in desperate need of disruption.

Adora.Promo harnesses the power of blockchain and AI to bridge the trust gap between creators and advertisers. Advertisers can send on-chain offers to creators, describing sponsorship requirements in natural language and setting payment terms based on engagement metrics.These offers are encrypted, ensuring they can only be viewed by the intended creator. Creators can accept offers without publicly disclosing their identity, post the sponsored content, and initiate a transaction to redeem their payment. Upon redemption, posts are verified against the requirements using a large language model before instantly transferring the earned amount to the creator’s private wallet.

## How does it work?
This project is made possible using Sismo to verify social media account ownership, Lit Protocol to encrypt offers, Chainlink Functions to fetch posts and interact with the ChatGPT API, Tableland to store offer details and ApeCoin for payments.

To create an offer, an advertiser specifies the recipient Twitter user ID, expiration date, payment per like, maximum payment, and sponsorship criteria described using natural language.  The advertiser then approves the maximum payment in ApeCoin.  Next, the user ID, payment per like and sponsorship criteria are all encrypted with a newly generated Lit Protocol symmetric key.  The advertiser then sends a transaction to create the offer, which writes the offer data to Tableland.  Finally, the frontend displays a URL which contains the offer ID and symmetric key so that it can be shared with the creator.

When the creator visits the URL, the offer data is fetched by ID, decrypted and displayed.  If the creator accepts, they are prompted to provide a proof of ownership of their Twitter account via Sismo; since the offer is not tied to a specific wallet address, creators can use a new wallet to maintain payment privacy.  Next, the creator sends a transaction containing the symmetric key and Simo proof both encrypted with a Chainlink Functions public key.  This transaction triggers a Chainlink Functions request which decrypts and verifies the offer and proof, returning a boolean value indicating that the creator’s Twitter account matches the Twitter account specified in the offer.  The offer is bound to the creator’s wallet and maximum payment approved by the advertiser is locked for the duration of the offer.  The symmetric key access control conditions are updated on Lit Protocol such that it can be accessed by both the creator’s and advertiser’s wallets to view offer details.

After posting a tweet which meets the sponsorship criteria and waiting for it to accumulate likes, creators can redeem their payment without publicly revealing which tweet was sponsored by encrypting the tweet ID with the symmetric key.  Then, they send a transaction containing the encrypted tweet ID and encrypted symmetric key which triggers a Chainlink Functions request.  Chainlink Functions decrypts the symmetric key, offer terms and tweet ID, fetches the tweet, uses ChatGPT to verify the tweet meets the sponsorship requirements and returns the total earnings which are paid to the creator with the remaining balance refunded to the advertiser.

## Useful links
- [Live demo](https://adora.promo)
- [Smart contracts repo](https://github.com/AdoraPromo/adora-smart-contracts)
- [Figma design files](https://www.figma.com/file/PrPBPXTdhnbcuOcSP2WT34/Adora.Promo?type=design&node-id=99-33057&mode=design&t=DOrmb5pbOWgIwotq-0)

============
============


# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
