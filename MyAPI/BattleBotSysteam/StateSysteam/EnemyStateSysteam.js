
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { removeMonster } from '../BattleSysteam/RemoveMonster'
import { Items, giveItems } from '../../InvintorySysteam/itemManager'

export function OnKillEnemy(Client, message, enemy, playerDamage, enemyDamage, power, getC, getD, playerInventory, botlogs, bots, botInfo, selbot, botid, defaltchannel) {
     
	const server = message.guild
	const user = message.member
	const quantity = 1
	let userResult = ''
	let privetResult = ''

	userResult += `\`\`\`js\nYou defeated the \`${enemy.MonsterName}\` in \`${server.name}\`
Here are the results:
Took: \`${enemyDamage}\` HP from the enemy
Lost: \`${playerDamage}\` of your own HP\`\`\``
	botlogs(enemy.Items)
	if (enemy.Items) {

		giveItems(Client, message, enemy.Items, quantity, message.guild.id, message.author.id)
	
		privetResult += `\`\`\`js\nObtained a ${enemy.Items}`
	}
	if (enemy.Exp) {
		getC.Exp += enemy.exp
		privetResult += `\nGained: ${enemy.exp} experience!`
		// c = true
	}

	if (enemy.Gold) {
		getD.Gold += enemy.Gold
		privetResult += `\nGot: $${enemy.Gold}!\`\`\``
	}

	server.__existingAttacks = []
	const globMessage = user + ` \`\`\`js\ndefeated the ${enemy.MonsterName}!
They fought with a power of ' + ${power} + and lost ${playerDamage} HP!\`\`\``

	removeMonster(Client, server, user, selbot, false, globMessage, botlogs, bots, botInfo, botid, defaltchannel, message)
	messagesManager(Client, message, privetResult, userResult, server, true, true)
}