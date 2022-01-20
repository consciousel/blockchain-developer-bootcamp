export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GREEN = 'success'
export const RED = 'danger'

export const DECIMALS = (10**18)

// Shortcut to avoid passing around web3 connection
export const ether = (wei) => {
	if(wei) {
		return(wei / DECIMALS) //18 decimal places 
	}
}

// Tokens and ether have the same decimal resolution 
export const tokens = ether 

export const formatBalance = (balance) => {
	const precision = 100 // 2 decimal places 

	balance = ether(balance)
	balance = Math.round(balance * precision) / precision  // Use 2 decimal places 

	return balance
}
// Timer to reload display 
export const wait = (seconds) => {
	const milliseconds = seconds * 10000
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// Refresh page 
export function refreshPage() {
    window.location.reload(false);
  }

