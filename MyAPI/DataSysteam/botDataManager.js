


export function initBotPlayers(Client, botInfo, defaltchannel, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].members.array().length; j++) {
			if (Client.guilds.array()[i].members.array()[j].user.bot === true) {
				const botdata = {
					ServerId: Client.guilds.array()[i].id,
					ServerName: Client.guilds.array()[i].name,
					BotId: Client.guilds.array()[i].members.array()[j].user.id,
					BotName: Client.guilds.array()[i].members.array()[j].user.username,
					BotNickName: Client.guilds.array()[i].members.array()[j].user.nickname,
					BattleMode: false,
					isonline: false,
					BotisUseable: false,
					logChannel: defaltchannel
				}
				botInfo[botdata.ServerId + botdata.BotId] = botInfo[botdata.ServerId + botdata.BotId] || botdata
			}
		}
	}
	saveData()
}

export function botlist(Client, bot) {
	const servers = Client.guilds.array()
	for (let i = 0; i < servers.length; i++) {
		const server = servers[i].id
		const bots = {
			id: []
		}
		bot[server] = bot[server] || bots
	}
}
