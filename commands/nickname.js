

const moogle = {}

// const CommandNames = moogle.CommandName || []

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.changename.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(.*) (\S*) (<@\d*>)/i) && (String(message.content.match(/(.*) (\S*) (<@\d*>)/i)[1])) === '') var regex = String(message.content.match(/(.*) (\S*) (<@\d*>)/i)[1])
	else if (message.content.match(/(.*) (\S*) (<@\d*>)/i) && regex !== '') regex = message.content.match(/(.*) (\S*) (<@\d*>)/i)[1]
	else return message.channel.send('You must add a name >changename [name]')
	if (userId !== message.member.user.id) {
		return message.channel.send('You can not change others name.')
	}
	getD.PlayerName = regex
	const level = getC.Level
	let lvl = `Lvl ${level} `
	if (getD.isDead !== false) {
		lvl = '[Dead] '
	}
	message.member.setNickname(lvl + getD.PlayerName)
	message.author.send('your nickname has been chaned')
}

module.exports.help = function (Commands, CommandName) {
	const Commanddata = {
		CommandName: '>ChangeName [Name]',
		CommandInfo: 'Allows you to change your name'
	}
	if (Commands[Commanddata.CommandName]) {
	} else {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

module.exports.permission = function (Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.changename = { UseableCommands: true, }

		}
		saveData()
	}
}

module.exports.getCommand = () => { return [['changename', 'changen', 'editname', 'editn'], /(.*)/] }
