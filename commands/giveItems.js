import { giveItems } from '../MyAPI/InvintorySysteam/itemManager'


export function run(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, pPI) {

	if (message.channel.type !== 'dm') {
		message.delete()
	}
	if (pPI[getD.PermissonId.GuildID + getD.PermissonId.RoleID].Command.giveitem.UseableCommands == false & Client.guilds.find('id', getD.PermissonId.GuildID).ownerID !== getD.PlayerId == true)
		return message.author.send(`${getD.PlayerName} you do not have permisson to use this command. Kupo.`)

	if (message.content.match(/(\S*) (\S*) (\d*)/i) && (String(message.content.match(/(\S*) (\S*) (\d*)/i)[2])) === '')
		var regex = String(message.content.match(/>(\S*) (\S*) (\d*)/i)[2])
	else if (message.content.match(/(\S*) (\S*) (\d*)/i) && regex !== '')
		regex = message.content.match(/(\S*) (\S*) (\d*)/i)[2]
	else
		return message.channel.send('You must add a Item Name amount and mention player  >giveitem [Item_Name] [#] [mention]')
	// message.channel.send(message.content.match(/>giveitem (\S*) (\S*) (.*)/i)[3])
	const ItemName = regex
	const quantity = Number(message.content.match(/>(\S*) (\S*) (\d*)/i)[3])
	console.log(ItemName + ' ' + quantity)

	giveItems(Client, message, ItemName, quantity, message.guild.id, userId)


}

export function help(Commands, CommandName) {
	// const Commanddata = {
	//   CommandName: `**????**`,
	//   CommandInfo: `**?????**`
	// }
	// if (Commands[Commanddata.CommandName]) {
	// } else {
	//   Commands[Commanddata.CommandName] = Commands[Commanddata.CommandName] || Commanddata
	//   CommandName.push(Commanddata.CommandName)
	// }
}

export function permission(Client, playerPermissionInfo, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].roles.array().length; j++) {
			playerPermissionInfo[Client.guilds.array()[i].id + Client.guilds.array()[i].roles.array()[j].id].Command.giveitem = { UseableCommands: false, }
		}
		saveData()
	}
}


export function getCommand() { return [['giveitem', 'givei'], /(.*)/] }
