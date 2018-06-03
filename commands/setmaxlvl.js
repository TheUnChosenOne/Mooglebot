
export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.changemaxlevel.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(\D*) (\d*)/i) && (String(message.content.match(/(\D*) (\d*)/i)[1])) === '') var regex = String(message.content.match(/(\D*) (\d*)/i)[1])
	else if (message.content.match(/(\D*) (\d*)/i) && regex !== 'null') regex = message.content.match(/(\D*) (\d*)/i)[1]
	else return message.channel.send('You must add a # >setmaxlevel [#]')

	message.channel.send('woah https://www.youtube.com/watch?v=O9LdZ7xaXTc' + message.member.lastMessage.createdAt)

}

export function help(Commands, CommandName) {
	// const Commanddata = {
	//   CommandName: `**????**`,
	//   CommandInfo: `**????**`
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
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.changemaxlevel = { UseableCommands: false, };
		}
		saveData();
	}
}

export function getCommand() { return [['setml', 'changemaxlevel', 'changeml'], /(\d*)/]; }
