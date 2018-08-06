import { CheckPlayerDeath } from '../StateSysteam/PlayerStateSysteam'
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { getClassData, getData } from '../../DataSysteam/getDataInfo'
import { battleHanler } from './BattleManager'


export function OnPlayerDamage(Client, enemy, playerDamage, guild, userID, guildID, playerInfo, classeslist) {
	
	let privetResult = ''
	let globResults = ''

	getClassData(userID, guildID, playerInfo, classeslist).Hp[0] -= playerDamage
	CheckPlayerDeath(Client, enemy, guild, userID, guildID, playerInfo, classeslist)
	if (battleHanler.enemyMiss == false){
		privetResult = `\`\`\`js\nYou were attacked by ${enemy.MonsterName} in ${guild.name}!\nDamage dealt to you is ${playerDamage}.\`\`\``
		globResults = `\`\`\`js\n${getData(userID, guildID, playerInfo).PlayerName} was attacked by ${enemy.MonsterName}!\nDamage dealt to ${getData(userID, guildID, playerInfo).PlayerName} is ${playerDamage}.\`\`\``
	} else {
		privetResult = `\`\`\`js\nYou were attacked by ${enemy.MonsterName} in ${guild.name}!\nYou have manage to have dodge the attack.\`\`\``
		globResults = `\`\`\`js\n${getData(userID, guildID, playerInfo).PlayerName} was attacked by ${enemy.MonsterName}!\nAnd the attack Missed ${getData(userID, guildID, playerInfo).PlayerName}.\`\`\``
	}
	messagesManager(Client, null, guild.members.find('id', getData(userID, guildID, playerInfo).PlayerId), privetResult, globResults, guild, true, true)
}