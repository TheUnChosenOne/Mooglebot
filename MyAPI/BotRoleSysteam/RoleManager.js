import { moogle } from '../../Main'




export function roleCreator (Client, guildId, rolename, reason) {
	if (Client.guilds.find('id', guildId).roles.find('name', rolename)) {
		console.log(` the role ${rolename} exests`)
		return
	}
	Client.guilds.find('id', guildId).createRole({
		name: rolename,
	}, reason)
	console.log(` the role ${rolename} was created`)
}

export function roleAdder(Client, guildId, memberId, rolename, reason) {
	if (Client.guilds.find('id', guildId).members.find('id', memberId).roles.find('name', rolename)) {
		console.log(` the member ${Client.guilds.find('id', guildId).members.find('id', memberId).user.username} has the role ${rolename}`)
		return
	}
	let role = Client.guilds.find('id', guildId).roles.find('name', rolename)
	console.log(role + ' ' + rolename)
	Client.guilds.find('id', guildId).members.find('id', memberId).addRole(role, reason).catch(err => { console.error(err) })
    
	console.log(` the role ${rolename} has been added to the member ${Client.guilds.find('id', guildId).members.find('id', memberId).user.username}`)
}
export function roleManager(Client) {
	for (let i = 0; i < Client.guilds.array().length; i++) {
		let guildId = Client.guilds.array()[i]
		for (let j = 0; j < Object.values(moogle.Classes).length; j++) {
			let Class = Object.values(moogle.Classes)[j].ClassName
			roleCreator(Client, guildId.id, `Class:${Class}`, 'Players classes')
		}
		for (let k = 0; k < Client.guilds.array()[i].members.array().length; k++) {
			let memberId = Client.guilds.array()[i].members.array()[k]
			//if (Client.guilds.find('id', guildId.id).members.find('id', memberId.id).bannable) {
			if (!moogle.playerInfo[guildId.id + memberId.id]) return
			roleAdder(Client, guildId.id, memberId.id, `Class:${moogle.classeslist[moogle.playerInfo[guildId.id + memberId.id].Class].ClassName}`, 'Player Has this class')
			// }
		}
	}
}