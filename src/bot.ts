import * as W3 from 'web3'
const Web3 = require('web3') // tslint:disable-line
import * as fs from 'fs'
const EtherDelta = require('./EtherDelta')
const log = console.log

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
// const web3 = new Web3(Web3.givenProvider || 'ws://35.171.161.95:8546')
const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546')


// // First compile the contract
// EtherDelta.generateContract().then((contract: any) => {
//   log("contract: ", contract)

//   log('listening...')
//   // contract.events.allEvents({fromBlock: 5576257, toBlock: 'latest'}, onEvent).on('data', function(event: any) {
//   //   console.log(event)
//   // }).on('changed', function(event: any) {
//   //   // remove event from local database
//   // }).on('error', console.error)

//   const tradeEvent = contract.events.Trade()
//   log(tradeEvent)
//   // tradeEvent.watch((error: any, event: any)=>{
//   //   if(error){
//   //     log("error: ", error)
//   //   } else {
//   //     log("\nevent: \n", error)
//   //   }
//   // })

// })



const deltasub = web3.eth.subscribe('logs', {address: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819'}, (error: any, transaction: any) => {
  if (!error) {
    log(`Transaction: `, transaction)
  } else {
    log(`Error: `, error)
  }
})




// const sub = web3.eth.subscribe('pendingTransactions').on('data', (transaction: any) => {
//   log(`Subscription - Pending Transaction Data: `, transaction)
// })


// async function onEvent(error: any, event: any) {
//   log('\nonEvent.event: \n', event)
// }




// web3.eth.getBlock(54565).then((results: object) => {
//   log('block: ', results)
// })



// const deltaSubscription = web3.eth.subscribe('logs', {
//   address: '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819',
// }, (error: object, result: object) => {
//   log('result: ', result)
// })





// const subscription = web3.eth.subscribe('newBlockHeaders', function(error: object, result: object){
//   log("block result: ", result)
// }).on("data", function(blockHeader: object){
//   log("block data: ", blockHeader)
// })




// const syncSubscription = web3.eth.subscribe('syncing', (results: object) => {
//   log(results)
// })


// const subscription = web3.eth.subscribe('syncing', function(error: object, sync: object){
//   log(sync)
// }).on("data", function(sync: object) {
//   log("sync",  sync)
// }).on("changed", function(isSyncing: object) {
//   log("issyncing", isSyncing)
// })
