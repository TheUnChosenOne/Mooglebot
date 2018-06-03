
import { messagesManager } from '../../MessageSysteam/messagesManager'

export function removeMonster(Client, server, winner, selbot, didEscape, content, botlogs, bots, botInfo, botid, defaltchannel, message) {

	if (selbot) {
		for (let i = 0; i < bots[server.id].id.length; i++) {
			if (bots[server.id].id[i] === selbot) {
				botid = bots[server.id].id[i]
				break
			}
		}
	}
	if (!botid)
		botid = bots[server.id].id[Math.floor(Math.random() * bots[server.id].id.length)]
	botInfo[server.id + botid].BattleMode = false
	const monster = server.members.get(botid).__currentBattleEnemy
	content = winner + `defeated the  ${monster.MonsterName}  '!` || content
	server.members.get(botid).setNickname(botInfo[server.id + botid].BotName)
	if (didEscape) {
		let userResult = `\`\`\`The ${monster.MonsterName} left the server...\`\`\``
		messagesManager(Client, message, '', userResult, server, false, true)
	} else {
		let userResult = content
		messagesManager(Client, message, '', userResult, server, false, true)
	}
}
