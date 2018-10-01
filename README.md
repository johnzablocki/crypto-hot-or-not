# Crypto Hot or Not

This repository contains a demo Dapp for my talk on Programming the Ethereum Blockchain, first presented at the [New England Microsoft Developer Meetup](https://www.meetup.com/NE-MSFT-Devs/events/254986942/) on 2018-10-04.

## Dapp Premise

Crypto Hot or Not is a spin on the old web 1.0 site Am I Hot or Not.  At current, a user creates a contest by entering a
minimum vote amount, a link to a picture, and the number of votes the contest receives before closing out.

Voters then send ether to the contest by way of a yes or no vote.  If a contest closes, and the constest owner is found
to be hot, then the owner gets to keep the money.  A future variant will distribute the funds raised in a losing contest
to a charity and the factory owner.

## Dependencies

Most dependencies are installed with npm (or yarn).  That said, you'll need node and/or yarn.

[node.js](https://nodejs.org)

[Yarn Package Manager](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

[Ganache GUI](https://truffleframework.com/ganache)

[MetaMask](https://metamask.io)

## Setup

This Dapp is very much a work in progress.  To get up and running, run the following tasks:

1. Clone the repo and install dependencies
```
git clone https://github.com/jzablocki/crypto-hot-or-not.git
cd cryto-hot-or-not
npm install
```

2. Compile the contract (the repo has a built contract already, this will just overwrite it)
```
node ethereum\compile.js
```

3. Run the tests
```
npm run tests
```

4. Ganache Setup
Make sure the Ganache GUI is running (see dependencies above).

Copy the mnemonic (12 word seed phrase) from the GUI and replace the seed phrase found in line 6 of ethereum/deploy.js

5. MetaMask Setup
Login to MetaMask by choosing the "Import seed phrase" option and use the seedphrase mentioned in step 4.

In the MetaMask network dropdown switch the network to Custom RPC and enter the address http://127.0.0.1:7545 (Ganache)

6. Run the app
```
yarn run dev
```

7. Browse to http://localhost:8081





