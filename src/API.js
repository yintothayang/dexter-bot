const log = console.log
const fs = require('fs')
const WebSocket = require('ws')
const web3 = require('web3')
const Decimal = require('decimal.js');
const WS_URIS = [
  "wss://socket01.etherdelta.com/socket.io/?EIO=3&transport=websocket",
  // "wss://socket02.etherdelta.com/socket.io/?EIO=3&transport=websocket",
  // "wss://socket03.etherdelta.com/socket.io/?EIO=3&transport=websocket",
  // "wss://socket04.etherdelta.com/socket.io/?EIO=3&transport=websocket",
  // "wss://socket05.etherdelta.com/socket.io/?EIO=3&transport=websocket",
  // "wss://socket06.etherdelta.com/socket.io/?EIO=3&transport=websocket",
]

const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
const ORDERS_DIR = "./orders/all.json"
const GOOD_DIR = "./orders/good/"
const TRADES_DIR = "./trades/all.json"

var connections = []
var total = 0

async function connect() {
  WS_URIS.forEach(uri => {
    try {
      let ws = new WebSocket(uri)
      listen(ws)
      connections.push(ws)
    }
    catch (e) {
      log(e)
    }
  })
}

async function listen(ws) {
  ws.on('open', onOpen)
  ws.on('message', onMessage)
}

function parseMessage(message) {
  let data = null
  try {
    data = JSON.parse(message.substring(2))
  }
  catch(e) {
    try {
      data = JSON.parse(message.substring(1))
    }
    catch(e) {
      log(e)
    }
  }

  if(data){
    return {
      'type': data[0],
      'data': data[1],
    }
  }
}

// Events
function onOpen(data) {
  log("onOpen: ", data)
}

function onMessage(message) {
  const data = parseMessage(message)
  log(message)
  if(data && data.type == 'orders'){
    onOrders(data)
  }
  if(data && data.type == 'trades'){
    onTrades(data)
  }

}

function onOrders(orders) {
  let orders_json = '[]'
  try {
    orders_json = fs.readFileSync(ORDERS_DIR)
  }
  catch(error){}
  let old_orders = JSON.parse(orders_json)
  old_orders.push(orders)
  fs.writeFileSync(ORDERS_DIR, JSON.stringify(old_orders), ()=>{})

  // // log("\nonOrders\n", orders)
  // let buys = orders.data.buys
  // let sells = orders.data.sells
  // let all = buys + sells

  // log("total buys: ", buys.length)
  // log("total sells: ", sells.length)

  // total++
  // log("writing: ", ALL_DIR + total + ".json")
  // fs.writeFileSync(ALL_DIR + total + ".json", JSON.stringify(all), ()=>{})

  // buys.forEach(buy => {
  //   if(buy.tokenGive == ETH_ADDRESS){
  //     let amountGet = new Decimal(buy.amountGet)
  //     let amountGive = new Decimal(buy.amountGive)
  //     if(amountGive > amountGet){
  //       log("\nbuy: ", buy)
  //       let good_buys_json = '[]'
  //       try {
  //         good_buys_json = fs.readFileSync(GOOD_DIR + "buys.json")
  //       }
  //       catch(error){}

  //       var good_buys = JSON.parse(good_buys_json)
  //       good_buys.push(buy)
  //       fs.writeFileSync(GOOD_DIR + "buys.json", JSON.stringify(good_buys), ()=>{})
  //     }
  //   }
  // })

  // sells.forEach(sell => {
  //   // If selling ETH
  //   if(sell.tokenGive == ETH_ADDRESS){
  //     let amountGet = new Decimal(sell.amountGet)
  //     let amountGive = new Decimal(sell.amountGive)
  //     if(amountGive > amountGet){
  //       log("\nsell: ", sell)
  //       let good_sells_json = '[]'
  //       try {
  //         good_sells_json = fs.readFileSync(GOOD_DIR + "sells.json")
  //       }
  //       catch(error){}

  //       var good_sells = JSON.parse(good_sells_json)
  //       good_sells.push(sell)
  //       fs.writeFileSync(GOOD_DIR + "sells.json", JSON.stringify(good_sells), ()=>{})
  //     }
  //   }
  // })
}

function onTrades(trades){
  let trades_json = '[]'
  try {
    trades_json = fs.readFileSync(TRADES_DIR)
  }
  catch(error){}
  let old_trades = JSON.parse(trades_json)
  old_trades.push(trades)
  fs.writeFileSync(TRADES_DIR, JSON.stringify(old_trades), ()=>{})
}


module.exports = {
  connect,
}
