import { getPlayerRoles } from './getDataInfo'
import { DnDStatRolls } from '../Others/math'



export function initPlayers(Client, playerInfo, defaltchannel, saveData) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		for (let j = 0; j < Client.guilds.array()[i].members.array().length; j++) {
			if (Client.guilds.array()[i].members.array()[j].user.bot === false) {
				const playerdata = {
					ServerId: Client.guilds.array()[i].id,
					ServerName: Client.guilds.array()[i].name,
					PlayerId: Client.guilds.array()[i].members.array()[j].user.id,
					PlayerName: Client.guilds.array()[i].members.array()[j].user.username,
					PlayerImg: Client.guilds.array()[i].members.array()[j].user.avatarURL,
					Class: Client.guilds.array()[i].id + Client.guilds.array()[i].members.array()[j].user.id + 'Adventurer',
					PermissonId: getPlayerRoles(Client, Client.guilds.array()[i].id, Client.guilds.array()[i].members.array()[j].user.id)['0' + Client.guilds.array()[i].members.array()[j].user.id],
					Race: 'Moogle',
					Gold: 300,
					Items: {},
					KeyItems: [],
					isDead: false,
					isonline: false,
					isRenamable: true,
					Strength: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					Dexterity: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					Constitution: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					Intelligence: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					Wisdom: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					Charisma: DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2],
					lvllcoation: 'Left',
					PlayerInfo: Client.guilds.array()[i].members.array()[j].user.note,
					logChannel: defaltchannel
				}
				playerInfo[playerdata.ServerId + playerdata.PlayerId] = playerInfo[playerdata.ServerId + playerdata.PlayerId] || playerdata
			}
		}
	}
	saveData()
}

export function playerlist(Client, player) {

	const servers = Client.guilds.array()
	for (let i = 0; i < servers.length; i++) {
		const server = servers[i].id
		const players = {
			id: []
		}
		player[server] = player[server] || players
	}
}