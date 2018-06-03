const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')

const moogle = {}

// const CommandNames = moogle.CommandName || []

export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {
	
	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.classlist.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)
	
	const embed = new Discord.RichEmbed()
		.setTitle('MoogleBot´s Class List')
		.addField('Class Name and Class Info', getCl, true)
	message.author.send(embed)
}

module.exports.help = function (Commands, CommandName) {
	const Commanddata = {
		CommandName: '>ClassList',
		CommandInfo: 'Gives a list of Classes'
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
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.classlist = { UseableCommands: true, }

		}
		saveData()
	}
}

module.exports.getCommand = () => { return [['classlist', 'classl', 'cl'], null] }
