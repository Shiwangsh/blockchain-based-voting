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

### SCREENSHOTS

![image](https://user-images.githubusercontent.com/61860925/182881463-c05a5b80-19ba-448a-940f-ae36f8531d19.png)

![image](https://user-images.githubusercontent.com/61860925/182881493-28c81aaf-dd24-44ca-9ce5-4fff89e2fae2.png)

![image](https://user-images.githubusercontent.com/61860925/182881571-c02132f2-c1f2-4b2b-a66c-49e7f4f62d04.png)

![image](https://user-images.githubusercontent.com/61860925/182881643-6fe698c1-3b5b-4a43-a6e9-bd71571ab4e0.png)

![image](https://user-images.githubusercontent.com/61860925/182881693-d10133e5-bd7e-4925-a814-897e0cd6460f.png)


