
let moogle = {}

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {
	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.useskill.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	const server = message.guild
	let botid = user.id
	if (message.content.match(/(\S*) (\S*)/i) && (String(message.content.match(/(\S*) (\S*)/i)[1])) === '')
		var regex = String(message.content.match(/(\S*) (\S*)/i)[2])
	else if (message.content.match(/(\S*) (\S*)/i) && regex !== 'null')
		regex = message.content.match(/(\S*) (\S*)/i)[1]
	else
		return message.channel.send('You must add a Skill_Id# >UseSkill [Skill_Id#]')
	const skill = message.content.match(/(\S*) (\S*)/i)[2]
	
	if (getD.isDead !== false) {
		message.channel.send('You cannot use skills while dead. Kupo!')
		return
	}
	if (!message.isMentioned) {
		message.user.send('must Mention @user or @bot')
		return
	}

	if (Skilllist[skill]) {
		if (!Skilllist[getC.Skillinfo[skill].SkillName]) {
			message.channel.send(Skilllist[getC.Skillinfo[skill].SkillName].SkillName + ' You do not have this ' + skill + '.')
			return
		}
		Skilllist[getC.Skillinfo[skill].SkillName].Effect(getC, getD, message, playerInventory, user, botlogs, botInfo)
		// moogle.takeskill(regex, getD, message)
	} else {
		message.channel.send('That skill does not exist.')
	}

}
moogle.notMe = function (message) {
	message.channel.send('Hey! You are not my master!')
}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>UseSkill <Skill_Name>',
		CommandInfo: 'Allows you to use skills'
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
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.useskill = { UseableCommands: false, }
		}
		saveData()
	}
}

export function getCommand() { return [['applyskill', 'applys', 'useskill', 'uses'], /(.*)/] }
