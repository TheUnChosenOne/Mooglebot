


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.ban.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(.*) (.*)/i)) {
		const bl = Array.from(message.mentions.users.values()).map(element => element.id)
		console.log(bl)
		if (message.author.id === '184650850688434176') {
			console.log(bl.length)
			// let bannedUsers = [];
			for (i = 0; i < bl.length; i++) {
				console.log(bl[i])
				if (bl[i] !== '184650850688434176') {
					contents.banlist.push(bl[i])
					// bannedUsers.push(bl[i]);
				}
			}
			message.channel.send(`${bl.length} user(s) have been banned from using me.`)
		}
		// else _pv.notMe(message)
	}
}
function contains (a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true
		}
	}
	return false
}

module.exports.help = function (Commands, CommandName) {
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

module.exports.permission = function (Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.ban = { UseableCommands: false, }

		}
		saveData()
	}
}

module.exports.getCommand = () => { return [['ban', 'unban'], null] }
