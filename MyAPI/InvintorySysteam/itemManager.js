
import { clean } from '../BotLevelSysteam/levelProcessing'
import { moogle, saveData } from '../../Main'
import { messagesManager } from '../MessageSysteam/messagesManager'


export class Items {
	constructor(ItemName, quantity) {
		this.ItemName = ItemName
		this.ItemId = moogle.Itemlist[ItemName].ItemId
		this.Amount = [quantity, 100]
	}
}

export function items(Items, ShopItems, ItemShop, itemslist, ItemInfo, botlogs) {

	for (let j = 0; j < itemslist.length; j++) {
		try {
			const item = require(`../../Items/${itemslist[j]}`)
			item.run(Items, ShopItems, ItemShop, ItemInfo)
			botlogs(`${j}: ${itemslist[j]}`)
		} catch (err) { botlogs(`ERROR: Item \`${itemslist[j]}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.\n\`\`\`js\n${clean(err)}\`\`\``) }
	}
}

export function giveItems(Client, message, ItemName, quantity, guildID, userId) {

	let re = /(\b[a-z](?!\s))/g;
	let ItemNames = ItemName
	ItemNames = ItemNames.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })

	console.log(ItemNames)

	if (typeCheck('giveItem', ItemNames, 'string') || typeCheck('giveItem', quantity, 'number')) return
	if (quantity === 0) {
		let GlobleResult = 'You can\'t give 0 items.'
		messagesManager(Client, message, null, '', GlobleResult, message.guild, false, true)
		return
	}

	if (isNaN(Number(ItemNames)) === false) {
		let GlobleResult = 'must be a name.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}

	if (isNaN(quantity) !== false) {
		let GlobleResult = 'must be a number.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}

	console.log(moogle.playerInventory)

	if (moogle.Itemlist[ItemNames]) {
		if (moogle.playerInventory[guildID + userId + ItemNames]) {
			moogle.playerInventory[guildID + userId + ItemNames].Amount[0] += quantity
		} else {
			moogle.playerInventory[guildID + userId + ItemNames] = new Items(ItemName, quantity)
			moogle.playerInfo[guildID + userId].Items[ItemNames] = new Items(ItemName, quantity)
		}
		if (moogle.playerInventory[guildID + userId + ItemNames].Amount > 1) {
			let GlobleResult = moogle.playerInfo[guildID + userId].PlayerName + ' has been given ' + quantity + ' ' + ItemNames + 's.'
			messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		} else {
			let GlobleResult = moogle.playerInfo[guildID + userId].PlayerName + ' has been given ' + quantity + ' ' + ItemNames + '.'
			messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		} 
	} else {
		let GlobleResult = 'That item does not exist.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
	}
	saveData()
}

export function removeItem(Client, message, ItemNames, quantity, guildID, userId) {
	

	let re = /(\b[a-z](?!\s))/g;
	let ItemName = ItemNames
	ItemName = ItemName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
	console.log(ItemName + ' ' +'-' + quantity)

	// check for errors in function call.
	if (typeCheck('takeItem', ItemName, 'string') || typeCheck('takeItem', quantity, 'number')) return
	if (quantity === 0) {
		let GlobleResult = 'You can\'t take 0 items.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}

	if (isNaN(Number(ItemName)) === false) {
		let GlobleResult ='must be a name.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}

	if (isNaN(quantity) !== false) {
		let GlobleResult = 'must be a number.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}

	if (!moogle.Itemlist[ItemName]) {
		let GlobleResult = moogle.playerInfo[guildID + userId].PlayerName + ' does not have any ' + ItemName + 's.'
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}
	if (quantity > moogle.playerInventory[guildID + userId + ItemName].Amount[0]) {
		message.channel.send(moogle.playerInfo[guildID + userId].PlayerName + ' does not have enough ' + ItemName + 's.')
		messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
		return
	}
	moogle.playerInventory[guildID + userId + ItemName].Amount[0] -= quantity
	let GlobleResult = quantity + '  ' + ItemName + 's.' + ' has been removed from ' + moogle.playerInfo[guildID + userId].PlayerName
	
	if (moogle.playerInventory[guildID + userId + ItemName].Amount[0] === 0) {
		let GlobleResult = quantity + '  ' + ItemName + 's.' + ' has been removed from ' + moogle.playerInfo[guildID + userId].PlayerName
		moogle.playerInventory[guildID + userId + ItemName] = undefined
		moogle.playerInfo[guildID + userId].Items[ItemName] = undefined
		
	}
	saveData()
	messagesManager(Client, message, '', GlobleResult, message.guild, false, true)
}

function typeCheck(source, input, expected) {
	if (typeof input !== expected) {
		console.log('Error in ' + source + '. ' + input + ' is not of type ' + expected + '.')
		return true
	} else return false
}
