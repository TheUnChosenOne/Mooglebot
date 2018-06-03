
import { OnDamageEnemy } from './DamageEnemy'
import { RichEmbed } from 'discord.js'
import { CheckPlayerDeath } from '../StateSysteam/PlayerStateSysteam'
import { OnKillEnemy } from '../StateSysteam/EnemyStateSysteam'
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { parseWhole } from '../../Others/math'


export function battleManager(message, userId, Classes, getD, getC, getI, getPi, playerInventory, getCd, getCl, Skillablity, SkillName, Skilllist, getS, getSI, ShopItems, getIS, user, botlogs, bots, botInfo, defaltchannel, Commands, CommandName, Client, contents, commandlist, regex) {
	
	
	let selbot = user
	let botid = user.id
	const server = message.guild
 
	if (getD.isDead !== false) {
		message.author.send('```You cannot fight enemies while dead. Kupo!```')
		return
	}
	if (getC.Level - 5 > server.members.get(botid).__currentBattleEnemyLv) {
		message.author.send('```You may not fight enemies more than 5 levels below your own level. Kupo!```')
		return
	}
	let globResult = new RichEmbed()

	if (botInfo[server.id + botid].BattleMode === true && regex.length > 0 && (parseWhole(regex) || 1) > 0) {
		const power = parseWhole(regex)
		const enemy = server.members.get(botid).__currentBattleEnemy
		if (server.members.get(botid).__existingAttacks.includes(getD.PlayerId)) {
			message.author.send('```You have already attacked the ' + enemy.MonsterName + ' in ' + server.name + '!```').then(function (msg) {
				message.delete()
			}).catch(console.error)
			return
		}
		const playerDamage = Math.floor(power * (enemy.Atk / getC.Def))
		const enemyDamage = Math.floor(power * (getC.Atk / enemy.Def))
		getC.Hp[0] -= playerDamage
		botlogs(`${user.user.username} used >Fight ${power} on ${server.members.get(botid).__currentBattleEnemy.MonsterName} and did ${enemyDamage} while taking ${playerDamage}`)
		if (getC.Hp[0] >= 0) {
			server.members.get(botid).__currentBattleEnemyHp -= enemyDamage
			if (server.members.get(botid).__currentBattleEnemyHp <= 0) {
				botlogs('dead monster')
				OnKillEnemy(Client, message, enemy, playerDamage, enemyDamage, power, getC, getD, playerInventory, botlogs, bots, botInfo, selbot, botid, defaltchannel)
			}
			else {
				OnDamageEnemy(Client, message, enemy, playerDamage, enemyDamage, power, getC, getD, playerInventory, botlogs, bots, botInfo, botid)
			}
		}
		CheckPlayerDeath(Client, message, enemy, server, user, getC, getD, botlogs, bots, botInfo, botid)
		botlogs('playerdead')
	}
	else {
		globResult.setDescription(`\`\`\`There is no enemy in ${server.name} right now.\`\`\``)
	}
	if (globResult) {

		messagesManager(Client, message, null, globResult, message.guild, false, true)

	} 

	botlogs('test')
	botlogs(getC.Hp[0])
}






