
import { RichEmbed } from 'discord.js'


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.help.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	const embed = new RichEmbed()
		.setTitle('```MoogleBot´s Command List```')
		.addField('```Command Name and Command Info```', `${getCd}` )
	message.author.send(embed)

}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>Help',
		CommandInfo: 'Gives info on all the commands'
	}
	if (!Commands[Commanddata.CommandName]) {
		Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
		CommandName.push(Commanddata.CommandName)
	}
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.help = { UseableCommands: true, }
		}
		saveData()
	}
}

export function getCommand() { return [['help', 'helpme', '?'], null] }
