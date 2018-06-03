import { messagesManager } from '../MyAPI/MessageSysteam/messagesManager';

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.addlvl.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(.*) (.*)/i) && (String(message.content.match(/(.*) (.*)/i)[2])) === '')
		var regex = String(message.content.match(/(.*) (.*)/i)[2])
	else if (message.content.match(/(.*) (.*)/i) && regex !== 'null')
		regex = message.content.match(/(.*) (.*)/i)[2]
	else
		return message.channel.send('You must use >level <add/remove>')

	console.log(regex)
	if (regex == 'remove') {
		getD.isRenamable = false
		message.member.setNickname(getD.PlayerName)
		messagesManager(Client, message, '', `${getD.PlayerName} level has been removed there name`, message.guild, false, true)
	}
	
	else if (regex == 'add'){
		getD.isRenamable = true
		const level = getC.Level
		let lvl = `Lvl ${level} `
		if (getD.isDead !== false) {
			lvl = '[Dead] '
		}
		if (getD.lvllcoation === 'Left') {
			message.member.setNickname(lvl + getD.PlayerName)
		}
		else {
			message.member.setNickname(getD.PlayerName + lvl)
		}
		messagesManager(Client, message, '', `${getD.PlayerName} level has been added there name`, message.guild, false, true)
	}


}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>level <add/remove>',
		CommandInfo: 'will add or remove the level from your name'
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
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.addlvl = { UseableCommands: false, }
		}
		saveData()
	}
}

export function getCommand() { return [['level', 'lvl', 'lv'], null] }
