
import { moogle } from '../Main'

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.useitem.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	// const regex = message.content.match(/>(\S*) (\S*)/i)[1]
	if (message.content.match(/(\S*) (\S*)/i) && (String(message.content.match(/(\S*) (\S*)/i)[2])) === '')
		var regex = String(message.content.match(/>(\S*) (\S*)/i)[2])
	else if (message.content.match(/(\S*) (\S*)/i) && regex !== 'null')
		regex = message.content.match(/(\S*) (\S*)/i)[2]
	else
		return message.channel.send('You must add a Item name >UseItem [Item Name]')
	console.log(regex)
	const itemIn = regex
	if (moogle.Itemlist[itemIn]) {
		if (!playerInventory[message.guild.id + message.member.user.id + itemIn]) {
			message.channel.send(message.member.user.username + ' does not have any ' + itemIn + 's.')
			return
		}
		moogle.ItemInfo[playerInventory[message.guild.id + message.member.user.id + itemIn].ItemName].Effect(getC, getD, message, playerInventory)
	}
	else {
		message.channel.send('That item does not exist.')
	}

}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>UseItems [ItemName]',
		CommandInfo: 'Allows you to use items'
	}
	if (Commands[Commanddata.CommandName]) {
	}
	else {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

module.exports.permission = function (Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.useitem = { UseableCommands: true, }

		}
		saveData()
	}
}

export function getCommand() { return [['useitem', 'usei', 'applyitem', 'applyi'], /(.*)/] }
