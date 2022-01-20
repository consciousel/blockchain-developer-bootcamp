export const EVM_REVERT = 'VM Exception while processing transaction: revert'

export const INVALID_ADD_TO = 'invalid address (arg="_to", coderType="address", value=0)'

export const INVALID_ADD_TOKEN = 'invalid address (arg="_token", coderType="address", value="0x0000000000000000000000000000000000000000")'

export const INVALID_ADD_SPENDER = 'invalid address (arg="_spender", coderType="address", value=0)'

export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const ether = (n) => {
	return new web3.utils.BN(
	web3.utils.toWei(n.toString(), 'ether')
	)
}

export const tokens = (n) => ether(n)
	