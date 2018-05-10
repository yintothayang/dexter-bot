import * as W3 from 'web3'
const Web3 = require('web3') // tslint:disable-line
const solc = require('solc')
const fs = require('fs')
const log = console.log


async function generateContract(){
  const web3 = new Web3(Web3.givenProvider || 'ws://35.171.161.95:8546')

  const raw_contract = fs.readFileSync('./src/EtherDelta.sol', 'utf-8')
  const compiled = solc.compile(raw_contract, 1)

  const ed_contract = compiled.contracts[':EtherDelta']
  const bytecode = ed_contract.bytecode
  const abi = JSON.parse(ed_contract.interface)

  const contract = await new web3.eth.Contract(abi, '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819')
  return contract
}


module.exports = {
  generateContract,
}
