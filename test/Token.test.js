import { tokens, EVM_REVERT, INVALID_ADD_TO, INVALID_ADD_SPENDER } from './helpers'

const Token = artifacts.require('./Token')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Token', ([deployer, receiver, exchange]) => {
	const name = 'DApp Token'
	const symbol = 'DAPP'
	const decimals = '18'
	const totalSupply = tokens(1000000).toString()
	let token

	beforeEach(async () => {
		token = await Token.new()
	})

	describe('Deployment', () => {
		it('tracks the name', async() => {
			const result = await token.name()
			result.should.equal(name)
		})

		it('tracks the symbol', async() => {
			const result = await token.symbol()
			result.should.equal(symbol)

		})		

		it('tracks the decimals', async() => {
			const result = await token.decimals()
			result.toString().should.equal(decimals)

		})	

		it('tracks the total supply', async() => {
			const result = await token.totalSupply()
			result.toString().should.equal(totalSupply)

		})	

		it('assigns the total supply to the deployer', async() => {
			const result = await token.balanceOf(deployer)
			result.toString().should.equal(totalSupply)

		})	
	})

	describe ('Sending tokens', () => {
		let amount 
		let result

		beforeEach(async () => {
			amount = tokens(100)
			await token.approve(receiver, amount, { from: deployer })
		})


	describe ('success', async () => {
		beforeEach(async () => {
			amount = tokens(100)
			result = await token.transfer(receiver, amount, { from: deployer})
		})
		
		it('transfers token balances', async () => {
			let balanceOf
			//Before transfer
			balanceOf = await token.balanceOf(deployer)
			console.log("deployer balance before transfer", balanceOf.toString())
			balanceOf = await token.balanceOf(receiver)
			console.log("receiver balance before transfer", balanceOf.toString())
		
			//Transfer
			await token.transfer(receiver, amount, { from: deployer})

			//After transfer
			balanceOf = await token.balanceOf(deployer)
			balanceOf.toString().should.equal(tokens(999800).toString())
			console.log("deployer balance after transfer", balanceOf.toString())
			balanceOf = await token.balanceOf(receiver)
			balanceOf.toString().should.equal(tokens(200).toString())
			console.log("receiver balance after transfer", balanceOf.toString())
		})

		it('emits a Transfer event', async () => {
			const log = result.logs[0]
			log.event.should.equal('Transfer')
			const event = log.args
			event.from.toString().should.equal(deployer, 'from is correct')
			event.to.should.eq(receiver, 'to is correct')
			event.value.toString().should.equal(amount.toString(), 'value is correct')
		})

	})
})

	describe ('Approving tokens', () => {
		let result 
		let amount 

		beforeEach(async () => {
			amount = tokens(100)
			result = await token.approve(exchange, amount, { from: deployer })
		})

		describe('success', () => {
			it('allocates an allowance for delegated token spending on exchange', async () => {
				const allowance = await token.allowance(deployer, exchange)
				allowance.toString().should.equal(amount.toString())
			})


			it('emits an Approval event', async () => {
			const log = result.logs[0]
			log.event.should.equal('Approval')
			const event = log.args
			event.owner.toString().should.equal(deployer, 'owner is correct')
			event.spender.should.eq(exchange, 'spender is correct')
			event.value.toString().should.equal(amount.toString(), 'value is correct')
		})
	})
	


	describe ('failure', async () => {
		
		it('rejects insufficient balances', async () => {
			let invalidAmount
			invalidAmount = tokens(1000000000) // 100 million - greater than total supply
			await token.transfer(receiver, invalidAmount, { from: deployer}).should.be.rejectedWith(EVM_REVERT)

			//Attempt transfer tokens, when you have none
			invalidAmount = tokens(10000) // recepient has no tokens
			await token.transfer(deployer, invalidAmount, { from: receiver}).should.be.rejectedWith(EVM_REVERT)
		})

		it('rejects invalid recipients', async () => {
			await token.transfer(0x0, amount, { from: deployer}).should.be.rejectedWith(INVALID_ADD_TO)
		})


		it('rejects invalid spenders', async () => {
			await token.approve(0x0, amount, { from: deployer}).should.be.rejectedWith(INVALID_ADD_SPENDER)
		})

	})


})

	describe ('Delegated token transfers', () => {
		let amount 
		let result

		beforeEach(async () => {
			amount = tokens(100)
			await token.approve(exchange, amount, { from: deployer })
		})


	describe ('success', async () => {
		beforeEach(async () => {
			result = await token.transferFrom(deployer, receiver, amount, { from: exchange})
		})
		
		it('allows the exchange to transfer tokens', async () => {
			let balanceOf
			
			//After transfer
			balanceOf = await token.balanceOf(deployer)
			balanceOf.toString().should.equal(tokens(999900).toString())
			console.log("deployer balance after transfer", balanceOf.toString())
			balanceOf = await token.balanceOf(receiver)
			balanceOf.toString().should.equal(tokens(100).toString())
			console.log("receiver balance after transfer", balanceOf.toString())
		})

		it('resets the allowance', async () => {
				const allowance = await token.allowance(deployer, exchange)
				allowance.toString().should.equal('0')
			})


		it('emits a Transfer event', async () => {
			const log = result.logs[0]
			log.event.should.equal('Transfer')
			const event = log.args
			event.from.toString().should.equal(deployer, 'from is correct')
			event.to.should.eq(receiver, 'to is correct')
			event.value.toString().should.equal(amount.toString(), 'value is correct')
		})
	})
	


	describe ('failure', async () => {
		it('rejects insufficient amounts', async () => {
			//Attempt transfer too many tokens
			const invalidAmount = tokens(10000000)
			await token.transferFrom(deployer, receiver, invalidAmount, { from: exchange }).should.be.rejectedWith(EVM_REVERT)
		})


		it ('rejects invalid recipients', async () => {
			await token.transferFrom(deployer, 0x0, amount, { from: exchange }).should.be.rejected
		})
	})

})

})



