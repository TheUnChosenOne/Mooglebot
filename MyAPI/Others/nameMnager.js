


export function server(Client, guild, bots, botInfo, ShopItems, playerInfo, classeslist, player) {
	const servers = Client.guilds.array()
	console.log(bots)
	for (let i = 0; i < servers.length; i++) {
		const server = servers[i]
		guild.push(servers)
		console.log(`Server Id: ${server.id} Server Name: ${server.name}`)
		if (bots[server.id].id.length === 0) {
			for (var j = 0; j < ShopItems.length; j++) {
				if (bots[server.id].id[j] === server.me.id) return
			}
			botInfo[server.id + server.me.id].BotisUseable = true
			bots[server.id].id.push(botInfo[server.id + server.me.id].BotId)
		}
		
		bot(server, botInfo)
		playerName(server, playerInfo, classeslist, player)
	}
}

export function playerName (server, playerInfo, classeslist, player) {
	const members = server.members.array()
	for (let i = 0; i < members.length; i++) {
		const mem = members[i]

		if (mem && mem.bannable) {
			if (!playerInfo[server.id + mem.user.id]) continue
			player[server.id].id.push(mem.user.id)
			const level = classeslist[playerInfo[server.id + mem.user.id].Class].Level
			let lvl = `Lvl ${level} `
			if (playerInfo[server.id + mem.user.id].isDead !== false) {
				lvl = '[Dead] '
			}
			if (mem.presence.status === 'online') {
				playerInfo[server.id + mem.user.id].isonline = true
			}
			if (mem.presence.status === 'offline') {
				playerInfo[server.id + mem.user.id].isonline = false
			}
			if (playerInfo[server.id + mem.user.id].isRenamable === true) {
				if (playerInfo[server.id + mem.user.id].lvllcoation === 'Left') {
					mem.setNickname(lvl + playerInfo[server.id + mem.user.id].PlayerName)
				} else {
					mem.setNickname(playerInfo[server.id + mem.user.id].PlayerName + lvl)
				}
			}
		}
	}
}

export function bot (server, botInfo) {
	const members = server.members.array()
	for (let i = 0; i < members.length; i++) {
		const mem = members[i]
		if (!botInfo[server.id + mem.id]) continue
		if (mem && mem.bannable) {
			mem.setNickname(botInfo[server.id + mem.id].BotName)
		}
		server.me.setNickname(botInfo[server.id + server.me.id].BotName)
		botInfo[server.id + mem.id].BattleMode = false
		if (botInfo[server.id + mem.id].BattleMode === true) {
			botInfo[server.id + server.me.id].BattleMode = false
		}
	}
}


