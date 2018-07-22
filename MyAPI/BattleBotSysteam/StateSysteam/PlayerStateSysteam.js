
import { messagesManager } from '../../MessageSysteam/messagesManager'

export function CheckPlayerDeath(Client, message, enemy, server, user, getC, getD, botlogs) {
	let privetResult = ''
	let userResult = ''

	if (getC.Hp[0] <= 0) {
		getC.Hp[0] = 0
		botlogs('Testing stuff.' + message.member.id)
		message.member.killPerson(message.member, message)
		privetResult = `\`\`\`You were killed by the ${enemy.MonsterName} in ${server.name}\`\`\``
		userResult = `\`\`\`${message.member.user.username} was killed by the ${enemy.MonsterName} ! May their soul rest in peace.\`\`\``
	}
	messagesManager(Client, message, privetResult, userResult, server, true, true)
}
