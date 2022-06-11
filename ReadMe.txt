Name : Shiwangsh Kc
UoN Id : 20416261
Module : CSY4010 Computing Dissertation

Decentralized voting system based on Ethereum blockchain.

## Requirements

- [Node.js](https://nodejs.org)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://trufflesuite.com/ganache/)
- [Metamask](https://metamask.io/)

## Setting up the development environment

1. Download and install NodeJS from https://nodejs.org/en/download/

   > node.js `v14.15.4`

2. Install truffle and ganache-cli or ganache-gui

   > truffle `v5.2.4`  
   > ganache-cli `v6.12.2`

   npm install -g truffle
   npm install -g ganache-cli

3. Install metamask browser extension from (https://metamask.io/download)

4.Run the Ganache local Ethereum blockchain

   > Note: Do not close Ganache (the blockchain network needs to be running all the time)

5. Configure metamask on the browser with following details

   New RPC URL: `http://localhost:8545` --> for the ganache cli
   Chain ID: `1337`

   RPC URL: `http://localhost:8545` --> for the ganache gui
   Chain ID: `1337`

6. Import accounts using private keys from ganache to the metamask extension on the browser
7. Deploy smart contract to the (local) blockchain

   truffle migrate

   > Note: Use `truffle migrate --reset` for redeployments

8. Launch the development server (fronted)

   cd client
   npm start

Register into the system, change account address via the metamask extension and log in to access the features of the system.