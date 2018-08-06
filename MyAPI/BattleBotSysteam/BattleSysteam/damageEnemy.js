
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { saveData } from '../../../Main'
import { giveItems } from '../../InvintorySysteam/itemManager'
import { getRandomIntInclusive } from '../../Others/math'
import { battleHanler } from './BattleManager'
import { rewards } from '../../BotRewardSysteam/RewardManager';

export function OnDamageEnemy(Client, message, enemy, enemyDamage, playerAttack, getC, getD, botid, botlogs) {
	const server = message.guild
	const user = message.member
	const userId = user.id
	const quantity = 1
	let privetResult = ''
	let userResult = ''
	botlogs(enemy.Items && getRandomIntInclusive(enemy.Hp / enemyDamage, enemyDamage * enemy.Hp) < (enemyDamage / enemy.Hp))
	// result.setDescription(userResult)
	if (battleHanler.playerMiss == false) {
		
		privetResult += `\`\`\`js\nYou attacked the \`${enemy.MonsterName}\` in \`${server.name}\`\nHere are the results:\nYou Damaged the \`${enemy.MonsterName}\` by  \`${enemyDamage}\`.\`\`\``
		rewards(Client, message, enemy, quantity, getD, getC, botlogs, false, enemyDamage)
		
		saveData()
		
		userResult = user + '\n' + `\`\`\`js\n  fought (with a attack power of ${playerAttack})\n  You damaged the ${enemy.MonsterName} by ${enemyDamage}\`\`\``
		
		server.members.get(botid).setNickname(`L${server.members.get(botid).__currentBattleEnemyLv} ${enemy.MonsterName} [${server.members.get(botid).__currentBattleEnemyHp} HP]`)
	} else {
		privetResult += `\`\`\`js\nYou attacked the \`${enemy.MonsterName}\` in \`${server.name}\`\nHere are the results:\nYou missed the \`${enemy.MonsterName}\`.\`\`\``
		userResult = user + '\n' + `\`\`\`js\n  fought (with a attack power of ${playerAttack})\n  You damaged the ${enemy.MonsterName} by ${enemyDamage}\`\`\``
	}
	server.members.get(botid).__existingAttacks.push(userId)
	messagesManager(Client, message, user, privetResult, userResult, server, true, true)
}