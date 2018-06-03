


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {
	if (message.channel.type == 'dm') 
		return message.author.send(`${getD.PlayerName} you can not use this command here. Kupo.`)
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.addbot.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)
	
	message.channel.send(Array.from(message.mentions.users.values()).map(element => element.id))
	message.delete()
}
export function help(Commands, CommandName) {
	// const Commanddata = {
	//   CommandName: `????`,
	//   CommandInfo: `????`
	// }
	// if (Commands[Commanddata.CommandName]) {
	// } else {
	//   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
	//   CommandName.push(Commanddata.CommandName)
	// }
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.addbot = { UseableCommands: false, }
		}
		saveData()
	}
}

export function getCommand() { return [['addbot', 'addb', 'ab'], /(.*)/] }
