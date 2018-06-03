


export function playerstatus(server, newMember, playerInfo) {
	const members = server.members.array()
	for (let i = 0; i < members.length; i++) {
		const mem = members[i]

		if (mem && mem.bannable) {
			if (!playerInfo[server.id + newMember.user.id]) continue
			if (newMember.presence.status === 'online') {
				playerInfo[server.id + newMember.user.id].isonline = 'true'
			}
			if (newMember.presence.status === 'offline') {
				playerInfo[server.id + newMember.user.id].isonline = 'false'
			}
		}
	}
}

export function botstatus(server, newMember, botInfo, bots) {
	const members = server.members.array()
	for (let i = 0; i < members.length; i++) {
		const mem = members[i]
		if (mem && mem.bannable) {

			if (!botInfo[server.id + newMember.id]) continue
			if (newMember.presence.status === 'online') {
				botInfo[server.id + newMember.id].isonline = true
				if (botInfo[server.id + newMember.id].BotisUseable === false) return
				for (var j = 0; j < Object.values(bots[server.id].id).length; j++) {
					if (bots[server.id].id[j] === newMember.id) return
				}
				bots[server.id].id.push(botInfo[server.id + newMember.id].BotId)
			}
			if (newMember.presence.status === 'offline') {
				botInfo[server.id + newMember.id].isonline = false
				bots[server.id].id.splice(botInfo[server.id + newMember.id].BotId)
			}
		}
	}
}

