import { initPlayers } from '../DataSysteam/playerDataManager'
import { initBotPlayers } from '../DataSysteam/botDataManager'
import { Classes } from '../BattleBotSysteam/ClassSysteam/classManager'



export function newPlayer(Client, member, botInfo, defaltchannel, saveData, playerInfo, Classess, ClassName, classeslist, classlist, contents) {
	const server = member.guild
	const user = member.user
	if (member.user.bot === true) return
	if (!playerInfo[server.id + user.id]) playerInfo[server.id + user.id] = {}
	if (playerInfo[server.id + user.id].logChannel[server.id]) {
		playerInfo[server.id + user.id].logChannel[server.id].send(member + ' has joined the battle! Kupo!')

		initPlayers(Client, playerInfo, defaltchannel, saveData)
		Classes(Client, Classess, ClassName, classeslist, classlist, contents)
	} else {

		initPlayers(Client, playerInfo, defaltchannel, saveData)
		Classes(Client, Classess, ClassName, classeslist, classlist, contents)
		member.guild.defaultChannel.send(member + ' has joined the battle! Kupo!')
	}
	
}

export function newBot(Client, member, botInfo, defaltchannel, saveData) {
	const server = member.guild
	const user = member.user
	if (member.user.bot === false) return
	if (!botInfo[server.id + user.id]) botInfo[server.id + user.id] = {}
	if (botInfo[server.id + user.id].logChannel[server.id]) {
		botInfo[server.id + user.id].logChannel[server.id].send(member + ' has joined the battle! Kupo!')
		initBotPlayers(Client, botInfo, defaltchannel, saveData)
	} else {
		initBotPlayers(Client, botInfo, defaltchannel, saveData)
		member.guild.defaultChannel.send(member + ' has joined the battle! Kupo!')
	}
}