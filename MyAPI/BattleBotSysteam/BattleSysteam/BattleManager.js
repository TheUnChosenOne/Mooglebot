
import { OnDamageEnemy } from './DamageEnemy'
import { RichEmbed } from 'discord.js'
import { OnKillEnemy } from '../StateSysteam/EnemyStateSysteam'
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { Modifier, getRandomIntInclusive } from '../../Others/math'
import { OnPlayerDamage } from './damageplayer'
import { getClassData, getData } from '../../DataSysteam/getDataInfo'
import { moogle, details } from '../../../Main'

export let battleHanler = {
	playerMiss: false,
	playerAttack: 0,
	enemyDamage: 0,
	enemyMiss: false,
	monsterAttack: 0,
	playerDamage: 0,
}

export function battleManager(message, getD, getC, user, botlogs, bots, botInfo, defaltchannel, Client) {

	let globResult = new RichEmbed()
	let selbot = user
	let botid = user.id
	const server = message.guild
	if (!moogle.botInfo[server.id + botid]) {

		globResult.setDescription('```You must select a bot to fight!```')
		messagesManager(Client, message, user, null, globResult, message.guild, false, true)
		return
	}
 
	if (getD.isDead !== false) {
		globResult.setDescription('```You cannot fight enemy while dead. Kupo!```')
		messagesManager(Client, message, user, null, globResult, message.guild, false, true)
		return
	}
	if (getC.Level - 5 > server.members.get(botid).__currentBattleEnemyLv) {
		globResult.setDescription('```You may not fight a enemy more than 5 levels below your own level. Kupo!```')
		messagesManager(Client, message, user, null, globResult, message.guild, false, true)
		return
	}
	

	if (moogle.botInfo[server.id + botid].BattleMode === true) {
		
		const enemy = server.members.get(botid).__currentBattleEnemy
		details(botInfo[server.id + botid].BattleMode === true, server, server.members.get(botid))
		if (server.members.get(botid).__existingAttacks.includes(getD.PlayerId)) {
			globResult.setDescription('```You have already attacked the ' + enemy.MonsterName + ' in ' + server.name + '! You must wait for the enemy to attack before attaking agen' + '.```')
			message.delete()
			messagesManager(Client, message, user, globResult, null, message.guild, true, false)
			return
		}

		playerAttacks(server, message, getD, getC, Client, enemy, globResult, botlogs, bots, botInfo, selbot, botid, defaltchannel)
		

	}
	else {
		globResult.setDescription(`\`\`\`There is no enemy in ${server.name} right now.\`\`\``)
		messagesManager(Client, message, message.member, null, globResult, message.guild, false, true)
		
	}

}

function playerAttacks(server, message, getD, getC, Client, enemy, globResult, botlogs, bots, botInfo, selbot, botid, defaltchannel) {

	if (getRandomIntInclusive(1, 20) + Modifier[getD.Strength] > enemy.ArmorClass) {
		globResult.setDescription('```You have missed your attack on ' + enemy.MonsterName + '!```')
		message.delete()
		messagesManager(Client, message, message.member, null, globResult, message.guild, false, true)

		battleHanler.playerMiss = true
		battleHanler.playerAttack = 0
		battleHanler.enemyDamage = 0
		if (getC.Hp[0] >= 0) {
			server.members.get(botid).__currentBattleEnemyHp -= battleHanler.enemyDamage
			if (server.members.get(botid).__currentBattleEnemyHp <= 0) {
				botlogs('dead monster')
				OnKillEnemy(Client, message, enemy, battleHanler.enemyDamage, battleHanler.playerAttack, getC, getD, botlogs, bots, botInfo, selbot, botid, defaltchannel)
			}
			else {
				OnDamageEnemy(Client, message, enemy, battleHanler.enemyDamage, battleHanler.playerAttack, getC, getD, botid, botlogs)
			}
		}
	} else {
	
		battleHanler.playerMiss = false
		battleHanler.playerAttack = Modifier[getD.Strength] + getRandomIntInclusive(1, 8)
		battleHanler.enemyDamage = Math.floor(battleHanler.playerAttack * (getC.Atk / enemy.Def))

		if (getC.Hp[0] >= 0) {
			server.members.get(botid).__currentBattleEnemyHp -= battleHanler.enemyDamage
			if (server.members.get(botid).__currentBattleEnemyHp <= 0) {
				botlogs('dead monster')
				OnKillEnemy(Client, message, enemy, battleHanler.enemyDamage, battleHanler.playerAttack, getC, getD, botlogs, bots, botInfo, selbot, botid, defaltchannel)
			}
			else {
				OnDamageEnemy(Client, message, enemy, battleHanler.enemyDamage, battleHanler.playerAttack, getC, getD, botid, botlogs)
			}
		}
	}

	
}

export function enemyAttacks(Client, guild, bots, playerlist, selBot, selPlayer, guildID, playerInfo, classeslist) {
	console.log('Fight')
	console.log(guild.id)
	console.log(playerlist[guild.id].id)
	let botID
	let userID
	let globResults = ''
	
	if (selPlayer) {
		for (let i = 0; i < playerlist[guild.id].id.length; i++) {
			if (playerlist[guild.id].id[i].selPlayer === selPlayer) {
				userID = playerlist[guild.id].id[i]
				break
			}
		}
	}
	if (!userID)

		userID = playerlist[guild.id].id[Math.floor(Math.random() * playerlist[guild.id].id.length)]
	if (!moogle.playerInfo[guild.id + userID]) return
	if (getData(userID, guildID, playerInfo).isDead == true) return

	console.log(userID)
	
	if (selBot) {
		for (let i = 0; i < bots[guild.id].id.length; i++) {
			if (bots[guild.id].id[i].selbot === selBot) {
				botID = bots[guild.id].id[i]
				break
			}
		}
	}
	if (!botID)
		botID = bots[guild.id].id[Math.floor(Math.random() * bots[guild.id].id.length)]

	console.log(botID)
	const enemy = guild.members.find('id', botID).__currentBattleEnemy


	if (getRandomIntInclusive(1, 20) + Modifier[enemy.Strength] > 10 + Modifier[getData(userID, guildID, playerInfo).Dexterity]) {
	
		globResults = '```' + enemy.MonsterName + ' have missed attack on ' + getData(userID, guildID, playerInfo).PlayerName + '!```'

		messagesManager(Client, null, null, null, globResults, guild, false, true)
		
		battleHanler.monsterAttack = 0
		battleHanler.playerDamage = 0
		battleHanler.enemyMiss = true
		OnPlayerDamage(Client, enemy, battleHanler.playerDamage, guild, userID, guildID, playerInfo, classeslist)
	} else {
		battleHanler.monsterAttack = Modifier[enemy.Strength] + getRandomIntInclusive(1, 8)
		if (battleHanler.monsterAttack >= -1) battleHanler.monsterAttack = 0
		battleHanler.playerDamage = Math.floor(battleHanler.monsterAttack * (enemy.Atk / getClassData(userID, guildID, playerInfo, classeslist).Def))
		battleHanler.enemyMiss = false
		OnPlayerDamage(Client, enemy, battleHanler.playerDamage, guild, userID, guildID, playerInfo, classeslist)
	}
}