
import { getRandomIntInclusive } from '../../Others/math'
import { messagesManager } from '../../MessageSysteam/messagesManager'
import { RichEmbed } from 'discord.js'


export function summonMonster(Client, server, selbot, name, lvl, monsters, bots, botInfo, GetAverageMaxLevel, monsterInfo, playerInfo, classeslist) {
	let monster
	let botid
	let embed = new RichEmbed
	if (name) {
		for (let i = 0; i < monsters.length; i++) {
			if (monsters[i].name === name) {
				monster = monsters[i]
				break
			}
		}
	}
	if (!monster)
		monster = monsters[Math.floor(Math.random() * monsters.length)]
	if (selbot) {
		for (let i = 0; i < bots[server.id].id.length; i++) {
			if (bots[server.id].id[i].selbot === selbot) {
				botid = bots[server.id].id[i]
				break
			}
		}
	}
	if (!botid)
		botid = bots[server.id].id[Math.floor(Math.random() * bots[server.id].id.length)]
	botInfo[server.id + botid].BattleMode = true
	server.__currentbot = botid
	server.members.get(botid).__currentBattleEnemy = monsterInfo[monster]
	const levelInfo = GetAverageMaxLevel(server, playerInfo, classeslist)
	let level = lvl
	if (!level) {
		level = Math.round(getRandomIntInclusive(levelInfo[0], levelInfo[1]) - getRandomIntInclusive(levelInfo[1], levelInfo[0]))
		if (Math.random() < 0.5) {
			level = Math.round(getRandomIntInclusive(levelInfo[0], levelInfo[1]) - getRandomIntInclusive(levelInfo[1], levelInfo[0]))
		}
	}
	server.members.get(botid).__currentBattleEnemyLv = monsterInfo[monster].Level + level
	server.members.get(botid).__currentBattleEnemy.atk = monsterInfo[monster].Atk * server.members.get(botid).__currentBattleEnemyLv
	server.members.get(botid).__currentBattleEnemy.def = monsterInfo[monster].Def * server.members.get(botid).__currentBattleEnemyLv
	server.members.get(botid).__currentBattleEnemy.health = monsterInfo[monster].Hp[0] * server.members.get(botid).__currentBattleEnemyLv
	server.members.get(botid).__currentBattleEnemy.exp = monsterInfo[monster].Exp * server.members.get(botid).__currentBattleEnemyLv
	// Variety Stats
	if (server.members.get(botid).__currentBattleEnemy.health <= 0)
		server.members.get(botid).__currentBattleEnemy.health = 100
	server.members.get(botid).__currentBattleEnemy.atk += Math.floor(Math.random() * 6) - 3
	server.members.get(botid).__currentBattleEnemy.def += Math.floor(Math.random() * 6) - 3
	if (server.members.get(botid).__currentBattleEnemy.atk <= 0)
		server.members.get(botid).__currentBattleEnemy.atk = 1
	if (server.members.get(botid).__currentBattleEnemy.def <= 0)
		server.members.get(botid).__currentBattleEnemy.def = 1
	if (server.members.get(botid).__currentBattleEnemy.exp <= 0)
		server.members.get(botid).__currentBattleEnemy.exp = 10
	// Setup Rest
	server.members.get(botid).__currentBattleEnemyHp = server.members.get(botid).__currentBattleEnemy.health
	server.members.get(botid).__existingAttacks = []
	server.members.get(botid).__existingVotes = []
	server.members.get(botid).__votesForChange = 0

	embed.setThumbnail(server.members.get(botid).avatarURL)
	embed.setTitle(`${botInfo[server.id + botid].BotName}`)
	embed.setDescription(`\`\`\`JS\nLvl ${server.members.get(botid).__currentBattleEnemyLv} ${monsterInfo[monster].MonsterName} has appeared!\nUse the >Fight [Power#] [@bot] to fight the enemy and potentially gain a reward!\nUse >Help to see more commands\`\`\``)

	server.members.get(botid).setNickname(`Lvl ${server.members.get(botid).__currentBattleEnemyLv} ${monsterInfo[monster].MonsterName} [${server.members.get(botid).__currentBattleEnemyHp} HP]`)

	messagesManager(Client, null, '', embed, server, false, true)
}

export function checkforMessageMonsters(message, ServerInfo) {
	const server = message.guild
	const serverId = server.id
	if (server.__battleIsActive) return
	if (!ServerInfo[serverId]) ServerInfo[serverId] = {}
	if (!ServerInfo[serverId].messages) ServerInfo[serverId].messages = 0
	ServerInfo[serverId].messages++
	if (ServerInfo[serverId].messages >= 10) {
		ServerInfo[serverId].messages = 0
		if (Math.random() < 0.2) {
			summonMonster(server)
		}
	}
}
