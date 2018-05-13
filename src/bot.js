const Web3 = require('web3')
const EtherDelta = require('./EtherDelta')
const API = require('./API')
const log = console.log


API.connect()

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
// const web3 = new Web3(Web3.givenProvider || 'ws://35.171.161.95:8546')
// const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546')

// web3.eth.isSyncing().then((result: any) => {
//   console.log("Syncing: ", result)
// })
