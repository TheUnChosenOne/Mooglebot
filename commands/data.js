
import { messagesManager } from '../MyAPI/MessageSysteam/messagesManager'
import { RichEmbed } from 'discord.js'


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.data.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (!getD) return
	if (!getC) return

	const l = getC.Level
	const expNeded = Classes[getC.ClassName].levellist[l].Exp - getC.Exp || 'empty'
	const embed = new RichEmbed()

	embed.setThumbnail(getD.PlayerImg || 'empty')
	embed.setTitle(`${getD.PlayerName}'s Status Window` || 'empty')
	embed.addField(`\`\`\`Class: ${getC.ClassName} Level: ${getC.Level}\`\`\``, `\`\`\`js\nCerrent Exp: ${getC.Exp}\nExp Needed: ${expNeded}\nMessage: ${getC.message[0]}/${getC.message[1]}\nGold: ${getD.Gold}\`\`\`` || 'empty', true)
	embed.addField('```Stats```', `\`\`\`js\nHP: ${getC.Hp[0]}/${getC.Hp[1]}\nMP: ${getC.Mp[0]}/${getC.Mp[1]}\nATK: ${getC.Atk}\nDEF: ${getC.Def}\`\`\`` || 'empty', true)
	embed.addBlankField(false)
	embed.addField('```Inventory```', `\`\`\`js\n${getPi}\n\`\`\`` || 'empty', true)
	embed.addField('```Skills```', `\`\`\`js\n${getS}\n\`\`\`` || 'empty', true)
	embed.addField('```Class Info```', `\`\`\`${getC.ClassInfo}\`\`\`` || 'empty', true)
	embed.addField('```Player Info```', `\`\`\`${getD.PlayerInfo}\`\`\`` || 'empty', true)
	embed.addField('```Guild Name```', `\`\`\`${getD.ServerName}\`\`\`` || 'empty', true)
	embed.setFooter(`Level: ${getC.Level} ${getD.PlayerName} ${getC.ClassName}`, getD.PlayerImg)
	embed.setTimestamp()
	messagesManager(Client, message, Client.guilds.find('id', getD.ServerId).members.find('id', getD.PlayerId), embed, null, Client.guilds.find('id', getD.ServerId), true, false)
}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>Data',
		CommandInfo: 'Gives info on your player'
	}
	if (!Commands[Commanddata.CommandName]) {

		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.data = { UseableCommands: true, }
		}
		saveData()
	}
}

export function getCommand() { return [['data', 'info', 'statuswindow', 'statusw'], null] }