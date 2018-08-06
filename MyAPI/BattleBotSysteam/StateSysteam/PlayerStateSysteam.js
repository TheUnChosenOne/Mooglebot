
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { getClassData, getData } from '../../DataSysteam/getDataInfo';

export function CheckPlayerDeath(Client, enemy, guild, userID, guildID, playerInfo, classeslist) {
	let privetResult = ''
	let globResults = ''
	getClassData
	getData
	if (getClassData(userID, guildID, playerInfo, classeslist).Hp[0] <= 0) {
		getClassData(userID, guildID, playerInfo, classeslist).Hp[0] = 0
		// botlogs('Testing stuff.' + message.member.id)
		Client.guilds.find('id', guild.id).members.find('id', getData(userID, guildID, playerInfo).PlayerId).killPerson(Client.guilds.find('id', guild.id).members.find('id', getData(userID, guildID, playerInfo).PlayerId), Client.guilds.find('id', guild.id))
		privetResult = `\`\`\`You were killed by the ${enemy.MonsterName} in ${guild.name}\`\`\``
		globResults = `\`\`\`${getData(userID, guildID, playerInfo).PlayerName} was killed by the ${enemy.MonsterName} ! May their soul rest in peace.\`\`\``
	}
	messagesManager(Client, null, guild.members.find('id', getData(userID, guildID, playerInfo).PlayerId), privetResult, globResults, guild, true, true)
}
