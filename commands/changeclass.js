import { moogle, saveData } from '../Main'
import { roleAdder } from '../MyAPI/BotRoleSysteam/RoleManager';


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.chaneclass.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(.*) (.*)/i) && (String(message.content.match(/(.*) (.*)/i)[2])) === '')
		var ClassName = String(message.content.match(/(.*) (.*)/i)[2])
	else if (message.content.match(/(.*) (.*)/i) && regex !== 'null')
		ClassName = message.content.match(/(.*) (.*)/i)[2]
	else
		return message.channel.send('You must add a Class Name >chaneclass [Class_Name]')

	let re = /(\b[a-z](?!\s))/g
	let regex = ClassName
	regex = regex.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })

	if (getD.ServerId + getD.PlayerId + regex === getD.Class) {
		message.author.send(`You are still ${regex}`)
		return
	}
	else if (moogle.classeslist[getD.ServerId + getD.PlayerId + regex] === undefined) {
		message.author.send(`${regex} is not a Class`)
		console.log(`${getD.ServerId + getD.PlayerId + regex} is not a Class`)
		return
	}
	else {
		let member = message.guild.member(userId)
		message.author.send(`Your class has been Change to ${regex}`)
		getD.Class = getD.ServerId + getD.PlayerId + regex

		for (let j = 0; j < Object.values(moogle.Classes).length; j++) {
			let notMyRole = Object.values(moogle.Classes)[j].ClassName	
			// delete Object.values(moogle.Classes)[`Class:${moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].ClassName}`]
			let role = message.guild.roles.find('name', `Class:${notMyRole}`) 
			member.removeRole(role)
			console.log(member.removeRole.name)
		}
		roleAdder(Client, message.guild.id, userId, `Class:${moogle.classeslist[moogle.playerInfo[message.guild.id + userId].Class].ClassName}`, 'Class change')
		saveData()
	}
}

export function help(Commands, CommandName) {
	const Commanddata = {
		CommandName: '>ChangeClass [ClassName]',
		CommandInfo: 'Allows you to change your class'
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
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.chaneclass = { UseableCommands: true, }
		}
		saveData()
	}
}

export function getCommand() { return [['chaneclass', 'changec', 'cc'], /(.*)/] }