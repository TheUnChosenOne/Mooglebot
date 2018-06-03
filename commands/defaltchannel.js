import { saveData, moogle } from '../Main'
import { messagesManager } from '../MyAPI/MessageSysteam/messagesManager'


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.defaltchannel.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(\S*) (\d*)/i) && (String(message.content.match(/(\S*) (\d*)/i)[1])) === '')
		var regex = String(message.content.match(/(\S*) (\d*)/i)[2])
	else if (message.content.match(/(\S*) (\d*)/i) && regex !== null)
		regex = message.content.match(/(\S*) (\d*)/i)[2] || message.channel.id

	if (!message.guild.channels.find('id', regex)) return messagesManager(Client, message, null, 'You must use a Channel Id >defaltchannel [ChannelId]', message.guild, false, true)
	console.log(message.channel.id)
	const defaltchannellist = {
		message: message.channel.id || regex
	}
	moogle.defaltchannel[message.guild.id] = moogle.defaltchannel[message.guild.id] || defaltchannellist
	message.channel.send(`you have set your defalt channel to ${message.channel.id || regex}`)
	saveData( )
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

module.exports.permission = function (Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.defaltchannel = { UseableCommands: false, }

		}
		saveData()
	}
}

export function getCommand() { return [['defaltchannel', 'defaltc', 'dc'], /(.*)/] }
