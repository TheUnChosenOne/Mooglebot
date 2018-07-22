import { giveItems } from '../MyAPI/InvintorySysteam/itemManager'
import { moogle } from '../Main'
import { RichEmbed } from 'discord.js'
import { messagesManager } from '../MyAPI/MessageSysteam/messagesManager'

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	let privetEmbed = new RichEmbed()
	let publicEnbed = new RichEmbed()

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.buyitem.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true){
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`you do not have permisson to use this command. Kupo.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```you do not have permisson to use this command. Kupo.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false )
		}
		return
	}
	if (message.content.match(/(\S*) (\S*) (\d*)/i) && (String(message.content.match(/(\S*) (\S*) (\d*)/i)[2])) === '')
		var regex = String(message.content.match(/(\S*) (\S*) (\d*)/i)[2])
	else if (message.content.match(/(\S*) (\S*) (\d*)/i) && regex !== '')
		regex = message.content.match(/(\S*) (\S*) (\d*)/i)[2]
	else {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`You must add a Item Name >buyitem [Item_Name] [#].\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```You must add a Item Name >buyitem [Item_Name] [#].```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
		return 
	}
	if (userId !== message.author.id) {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`You can not make others people buy items.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```You can not make others people buy items.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
		return
	}
	const itemIn = regex
	const quantity = Number(message.content.match(/>(\S*) (\S*) (\d*)/i)[3])
	console.log(itemIn + ' ' + quantity)
	//  check for errors in function call.
	if (typeCheck('giveItem', itemIn, 'string') || typeCheck('giveItem', quantity, 'number'))
		return
	if (quantity === 0) {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`You can\'t give 0 items.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```You can\'t give 0 items.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
		return
	}
	if (isNaN(Number(itemIn)) === false) {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`must be a name.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```must be a name.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
		return
	}
	if (isNaN(quantity) !== false) {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`must be a number.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```must be a number.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
		return
	}
	console.log(playerInventory)
	if (moogle.Itemlist[itemIn]) {
		if (getIS[itemIn]) {
			if (getIS[itemIn].Gold * quantity > getD.Gold) {
				if (message.channel.type !== 'dm') {
					publicEnbed.setDescription(`${getD.PlayerName} \`\`\`You do not have the gold to spar.\`\`\``)
					messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
				} else {
					privetEmbed.setDescription('```You do not have the gold to spar.```')
					messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
				}
				return
			}
			getD.Gold -= getIS[itemIn].Gold * quantity

			giveItems(Client, message, itemIn, quantity, message.guild.id, userId)

		} else {
			if (message.channel.type !== 'dm') {
				publicEnbed.setDescription(`${getD.PlayerName} \`\`\`That item is not for sell.\`\`\``)
				messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
			} else {
				privetEmbed.setDescription('```That item is not for sell.```')
				messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
			}
		}
	}
	else {
		if (message.channel.type !== 'dm') {
			publicEnbed.setDescription(`${getD.PlayerName} \`\`\`That item does not exist.\`\`\``)
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, false, true)
		} else {
			privetEmbed.setDescription('```That item does not exist.```')
			messagesManager(Client, message, privetEmbed, publicEnbed, message.guild, true, false)
		}
	}
}

function typeCheck (source, input, expected) {
	if (typeof input !== expected) {
		console.log('Error in ' + source + '. ' + input + ' is not of type ' + expected + '.')
		return true
	} else return false
}

export function help(Commands, CommandName) {

	const Commanddata = {
		CommandName: '>BuyItems <ItemName> <Amount>',
		CommandInfo: 'Allows you to buy items'
	}
	if (Commands[Commanddata.CommandName]) {
	} else {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.buyitem = { UseableCommands: true, }
		}
		saveData()
	}
}

export function getCommand() { return [['buyitem', 'buyi', 'bi'], /(.*)/] }
