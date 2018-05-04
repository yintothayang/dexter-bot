const Web3 = require('web3')
const log = console.log


const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));


// var filter=web3.eth.filter({fromBlock: 866705, toBlock: 909023, address: contractAddress});

// filter.get(function(error, log) {
//   console.log(JSON.stringify(log))
// });




async function sync(){
  log("syncing")

  let latest_block = await web3.eth.getBlock("latest")
  log("latest: ", latest_block)


  web3.eth.subscribe('logs', {
    address: "0x8d12A197cB00D4747a1fe03395095ce2A5CC6819"
  }, (log => {
    console.log("log: ", log)
  }))
}


sync()
