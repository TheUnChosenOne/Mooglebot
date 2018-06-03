
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { saveData } from '../../../Main'
import { giveItems } from '../../InvintorySysteam/itemManager';

export function OnDamageEnemy(Client, message, enemy, playerDamage, enemyDamage, power, getC, getD, playerInventory, botlogs, bots, botInfo, botid, Item) {
	const server = message.guild
	const user = message.member
	const userId = user.id
	const quantity = 1
	let privetResult = ''
	let userResult = ''
	// result.setDescription(userResult)
	userResult += `\`\`\`js\nYou attacked the \`${enemy.MonsterName}\` in \`${server.name}\`\nHere are the results:\nTook: \`${enemyDamage}\` HP from the enemy.\nLost: \`${playerDamage}\` of your own HP.\`\`\``
	if (enemy.reward && Math.random() < (enemyDamage / enemy.Hp)) {

		giveItems(Client, message, enemy.Items, quantity, message.guild.id, message.author.id)
		
		privetResult += `Obtained a ${enemy.Items} !`
	}
	const exp = Math.floor(enemy.exp * (enemyDamage / enemy.Hp))
	if (exp) {
		getC.Exp += exp
		privetResult += `\nGained ${exp} experience!`
		
	}
	const gold = Math.floor(enemy.Gold * (enemyDamage / enemy.Hp))
	if (gold) {
		getD.Gold += gold
		privetResult += `\nGot $ ${gold}!`
	}
	saveData()
	privetResult = `\`\`\`js\n${user}\n  fought (with a power of ${power})\n  They damaged ${enemy.MonsterName} by ${enemyDamage} \n  HP and lost ${playerDamage} HP!\`\`\``
	server.members.get(botid).setNickname(`L${server.members.get(botid).__currentBattleEnemyLv} ${enemy.MonsterName} [${server.members.get(botid).__currentBattleEnemyHp} HP]`)
	server.members.get(botid).__existingAttacks.push(userId)
	messagesManager(Client, message, privetResult, userResult, server, true, true)
}