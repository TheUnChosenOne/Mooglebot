
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { removeMonster } from '../BattleSysteam/RemoveMonster'
import { Items, giveItems } from '../../InvintorySysteam/itemManager'
import { rewards } from '../../BotRewardSysteam/RewardManager';

export function OnKillEnemy(Client, message, enemy, enemyDamage, playerAttack, getC, getD, botlogs, bots, botInfo, selbot, botid, defaltchannel) {
     
	const server = message.guild
	const user = message.member
	const quantity = 1
	let userResult = ''
	let privetResult = ''

	userResult += `\`\`\`js\nYou defeated the \`${enemy.MonsterName}\` in \`${server.name}\`
Here is the battle results:
Took: \`${enemyDamage}\` HP from the enemy\`\`\``

	rewards(Client, message, enemy, quantity, getD, getC, botlogs, true)
	server.__existingAttacks = []
	const globMessage = user + ` \`\`\`js\ndefeated the ${enemy.MonsterName}!\nyou fought with a attack power of '${playerAttack}\`\`\``

	removeMonster(Client, server, user, selbot, false, globMessage, botlogs, bots, botInfo, botid, defaltchannel, message)
	messagesManager(Client, message, message.member, privetResult, null, server, true, false)
}