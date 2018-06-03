


export function getData(userID, guildID, playerInfo) {
	//console.log(playerInfo)
	//console.log(message.guild.id)
	//console.log(userId)
	if (!playerInfo[guildID + userID]) return
	// if (message.user.bot !== false) return []
	return playerInfo[guildID + userID] || { Items: {} }
}

export function getClassData(userId, guildID, playerInfo, classeslist) {
	if (!playerInfo[guildID + userId]) return
	// if (message.user.bot !== false) return []
	return classeslist[getData(userId, guildID, playerInfo).Class] || { Skill: [] }
}

export function getItemData(guildId, userId, playerInfo) {
	let result = ''
	if (!playerInfo[guildId + userId]) return
	if (Object.values(getData(userId, guildId, playerInfo).Items).length === 0) { var test2 = 'inventory is empty. Kupo.' } else {
		console.log(playerInfo.PlayerName + ' has: ')
		console.log(Object.values(getData(userId, guildId, playerInfo).Items))
		for (var i = 0; i < Object.values(getData(userId, guildId, playerInfo).Items).length; i++) {
			if (Object.values(getData(userId, guildId, playerInfo).Items)[i] !== undefined) {
				var test = `${Object.values(getData(userId, guildId, playerInfo).Items)[i].ItemName}: ${Object.values(getData(userId, guildId, playerInfo).Items)[i].Amount[0]}`
			} else {
				Object.values(getData(userId, guildId, playerInfo).Items).splice(undefined)
				test = 'Item\'s have been Removed. Kupo.'
				for (var i = 0; i < Object.values(getData(userId, guildId, playerInfo).Items).length; i++) {
					if (Object.values(getData(userId, guildId, playerInfo).Items)[i] !== undefined) {
						test = `${Object.values(getData(userId, guildId, playerInfo).Items)[i].ItemName}: ${Object.values(getData(userId, guildId, playerInfo).Items)[i].Amount[0]}`
					}
				}
			}
			result += `${test}\n`
			
		}
	}
	return test2 || result
}

export function getCommandData(CommandName, Commands) {
	let result = ''
	if (CommandName.length === 0) { var test2 = 'there is no help for you' } else {
		for (var i = 0; i < CommandName.length; i++) {
			if (Commands[CommandName[i]] !== undefined) {
				var test = `\`\`\`js\n[#${i + 1}] ${Commands[CommandName[i]].CommandName}\n ${Commands[CommandName[i]].CommandInfo}\`\`\``
			}
			result += `${test}\n`
		}
	}
	return test2 || result
}

export function getClassListData(ClassName, Classes) {
	let result = ''
	if (ClassName.length === 0) { var test2 = 'you have no class' } else {
		for (var i = 0; i < ClassName.length; i++) {
			if (Classes[ClassName[i]] !== undefined) {
				var test = `${Classes[ClassName[i]].ClassName}\n${Classes[ClassName[i]].ClassInfo}`
			}
			result += `${test}\n`
		}
	}
	return test2 || result
}

export function getSkillListData(getC, guildId, playerId, playerInfo, Skilllist) {

	let result = ''

	if (!playerInfo[guildId + playerId]) return
	if (!getC) return
	if (getC.Skill.length === 0) { var test2 = 'you have no class' } else {
		for (var i = 0; i < getC.Skill.length; i++) {
			if (Skilllist[getC.Skill[i]] !== undefined) {
				var test = `Skill ID: ${[i]} Name: ${Skilllist[getC.Skill[i]].SkillName} MP Cost: ${Skilllist[getC.Skill[i]].Mpcost}\nInfo: ${Skilllist[getC.Skill[i]].SkillInfo}`
			}
			result += `${test}\n`
		}
	}
	return test2 || result
}

export function getShopItemData(ShopItems, ItemShop) {

	let result = ''

	if (ShopItems.length === 0) { var test2 = 'you have no class' } else {
		for (var i = 0; i < ShopItems.length; i++) {
			if (ItemShop[ShopItems[i]] !== undefined) {
				var test = `Item Name: ${ItemShop[ShopItems[i]].ItemName} Item Cost: ${ItemShop[ShopItems[i]].Gold} Gold\nItem Info: ${ItemShop[ShopItems[i]].ItemInfo}`
			}
			result += `${test}\n`
		}
	}
	return test2 || result
}

export function getItemData2(guildId, userId, Item, playerdata) {
	return playerdata[guildId + userId + Item]
}

export function getBotData(botId, server, botInfo) {
	return botInfo[server + botId]
}

export function getMonster(monster, monsterlist) {
	return monsterlist[monster]
}

export function getDefaltChannel(guildId, defaltchannel) {
	return defaltchannel[guildId]
}

export function getPlayerRoles(Client ,guildId, userId) {

	const roles ={}
	const role = Client.guilds.find('id', guildId).members.find('id', userId).roles.array()
	for (let i = 0; i < role.length; i++) {
		const roleId = role[i].id
		if (Client.guilds.find('id', guildId).members.find('id', userId).roles.findAll('id', roleId)) {
			// console.log(roleId + ':[' + i + ']')
			roles[i + userId] = { RoleID: roleId, GuildID: guildId }
		}
	}
	return roles
}