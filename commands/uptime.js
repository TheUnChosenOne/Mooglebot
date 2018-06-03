


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {
	
	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.uptime.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)
	message.channel.send(`I have been up for about ${msConversion(Client.uptime)}.`)
	
}
function msConversion (number) {
	if (number >= 31536000000) return `${Math.floor(number / 31536000000)} year${addS(number, 'year')} and ${ms2(number % 31536000000)}`
	else if (number >= 2592000000) return `${Math.floor(number / 2592000000)} month${addS(number, 'month')} and ${ms2(number % 2592000000)}`
	else if (number >= 604800000) return `${Math.floor(number / 604800000)} week${addS(number, 'week')} and ${ms2(number % 604800000)}`
	else if (number >= 86400000) return `${Math.floor(number / 86400000)} day${addS(number, 'day')} and ${ms2(number % 86400000)}`
	else if (number >= 3600000) return `${Math.floor(number / 3600000)} hour${addS(number, 'hour')} and ${ms2(number % 3600000)}`
	else if (number >= 60000) return `${Math.floor(number / 60000)} minute${addS(number, 'minute')}`
	else return 'less than a minute'
	function addS (number, type) {
		if (number >= 31536000000 * 2 && type === 'year') return 's'
		if (number >= 2592000000 * 2 && type === 'month') return 's'
		if (number >= 604800000 * 2 && type === 'week') return 's'
		if (number >= 86400000 * 2 && type === 'day') return 's'
		if (number >= 3600000 * 2 && type === 'hour') return 's'
		if (number >= 60000 * 2 && type === 'minute') return 's'
		return ''
	}
	function ms2 (number) {
		if (number >= 31536000000) return `${Math.floor(number / 31536000000)} year${addS(number, 'year')}`
		else if (number >= 2592000000) return `${Math.floor(number / 2592000000)} month${addS(number, 'month')}`
		else if (number >= 604800000) return `${Math.floor(number / 604800000)} week${addS(number, 'week')}`
		else if (number >= 86400000) return `${Math.floor(number / 86400000)} day${addS(number, 'day')}`
		else if (number >= 3600000) return `${Math.floor(number / 3600000)} hour${addS(number, 'hour')}`
		else if (number >= 60000) return `${Math.floor(number / 60000)} minute${addS(number, 'minute')}`
		else return ''
	}
}
export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>uptime',
		CommandInfo: 'Allows you to see how long the bots been running'
	}
	if (!Commands[Commanddata.CommandName]) {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.uptime = { UseableCommands: true, }
		}
		saveData()
	}
}

export function getCommand() { return [['uptime', 'runtime', 'ut'], null] }
