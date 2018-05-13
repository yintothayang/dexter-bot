const Web3 = require('web3')
const solc = require('solc')
const fs = require('fs')
const log = console.log


async function generateContract() {
  const web3 = new Web3(Web3.givenProvider || 'ws://35.171.161.95:8546')

  const raw = fs.readFileSync('./src/EtherDelta.sol', 'utf-8')
  const compiled = solc.compile(raw, 1)

  const ed = compiled.contracts[':EtherDelta']
  const bytecode = ed.bytecode
  const abi = JSON.parse(ed.interface)

  const contract = await new web3.eth.Contract(abi, '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819')
  return contract
}


module.exports = {
  generateContract,
}
