
let moogle = {}
export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.reload.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.author.id === '184650850688434176') {
		if (message.content.match(/(.*) (\S*.js)/i) && (String(message.content.match(/(.*) (\S*.js)/i)[1])) === '') var regex = String(message.content.match(/(.*) (\S*.js)/i)[1])
		else if (message.content.match(/(.*) (\S*.js)/i) && regex !== 'null') regex = message.content.match(/(.*) (\S*.js)/i)[1]
		else return message.channel.send('You must add a js >reload [js]')

		delete require.cache['' + __dirname + '/' + regex + '.js']
		message.channel.send('```js\n' + __dirname + '/' + regex + '.js```was (.*)ed.')
	} else moogle.notMe(message)
	// }
}
moogle.notMe = function (message) {
	message.channel.send('Hey! You are not my master!')
}

module.exports.help = function (Commands, CommandName) {
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

module.exports.permission = function (Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.reload = { UseableCommands: false, }

		}
		saveData()
	}
}

module.exports.getCommand = () => { return [['reload', 'rl', 'deletecache'], /(.*)/] }
