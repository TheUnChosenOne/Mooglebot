import { items } from "../MyAPI/InvintorySysteam/itemManager";
import { moogle } from "../Main";

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.buyitem.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(\S*) (\S*) (\d*)/i) && (String(message.content.match(/(\S*) (\S*) (\d*)/i)[2])) === '')
		var regex = String(message.content.match(/(\S*) (\S*) (\d*)/i)[2])
	else if (message.content.match(/(\S*) (\S*) (\d*)/i) && regex !== '')
		regex = message.content.match(/(\S*) (\S*) (\d*)/i)[2]
	else
		return message.channel.send('You must add a Item Name >buyitem [Item_Name] [#]')
	if (userId !== message.member.user.id) {
		return message.channel.send('You can not make others people buy items.')
	}
	const itemIn = regex
	const quantity = Number(message.content.match(/>(\S*) (\S*) (\d*)/i)[3])
	console.log(itemIn + ' ' + quantity)
	//  check for errors in function call.
	if (typeCheck('giveItem', itemIn, 'string') || typeCheck('giveItem', quantity, 'number'))
		return
	if (quantity === 0) {
		message.channel.send('You can\'t give 0 items.')
		return
	}
	if (isNaN(Number(itemIn)) === false) {
		message.channel.send('must be a name.')
		return
	}
	if (isNaN(quantity) !== false) {
		message.channel.send('must be a number.')
		return
	}
	console.log(playerInventory)
	if (moogle.Itemlist[itemIn]) {
		if (getIS[itemIn]) {
			if (getIS[itemIn].Gold * quantity > getD.Gold) {
				return message.channel.send('You do not have the gold to spar')
			}
			if (playerInventory[message.guild.id + message.member.user.id + itemIn]) {
				getD.Gold -= getIS[itemIn].Gold * quantity
				playerInventory[message.guild.id + message.member.user.id + itemIn].Amount[0] += quantity
			}
			else {
				getD.Gold -= getIS[itemIn].Gold * quantity
				playerInventory[message.guild.id + message.member.user.id + itemIn] = new items(itemIn, quantity)
				getD.Items.push(itemIn)
			}
			if (playerInventory[message.guild.id + message.member.user.id + itemIn].Amount > 1) {
				message.channel.send(message.member.user.username + ' has been given ' + quantity + ' ' + itemIn + 's.')
			}
			else {
				message.channel.send(message.member.user.username + ' has been given ' + quantity + ' ' + itemIn + '.')
			}
		}
		else {
			message.channel.send('That item is not for sell.')
		}
	}
	else {
		message.channel.send('That item does not exist.')
	}
	message.delete()
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
	}
	else {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.buyitem = { UseableCommands: true, };
		}
		saveData();
	}
}

export function getCommand() { return [['buyitem', 'buyi', 'bi'], /(.*)/] }
