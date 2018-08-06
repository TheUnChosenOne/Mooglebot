
import { onLevelChange } from './levelUpSystem'
import { getData, getClassData } from '../DataSysteam/getDataInfo'

export function checkForLevelChange(Client, userId, message, playerInfo, Classes, classInfo, classeslist) {
	getData(userId, message, playerInfo)
	var exp = getClassData(userId, message.guild.id, playerInfo, classeslist).Exp
	// const exp = PlayerInfo[message.guild.id + userId].Exp
	if (!playerInfo[message.guild.id + userId]) {
		playerInfo[message.guild.id + userId] = {}
	}
	else {
		let setLevel = Classes[classInfo[playerInfo[message.guild.id + userId].Class].ClassName].levellist.length
		for (let i = 0; i < Classes[classInfo[playerInfo[message.guild.id + userId].Class].ClassName].levellist.length; i++) {
			if (exp < Classes[classInfo[playerInfo[message.guild.id + userId].Class].ClassName].levellist[i].Exp) {
				setLevel = Classes[classInfo[playerInfo[message.guild.id + userId].Class].ClassName].levellist[i].Level
				break
			}
		}
		if (getClassData(userId, message.guild.id, playerInfo, classeslist).Level !== setLevel) {
			getClassData(userId, message.guild.id, playerInfo, classeslist).Level = setLevel
			onLevelChange(Client, userId, message, classInfo, playerInfo)
			if (message.member.bannable) {
				const level = classInfo[playerInfo[message.guild.id + userId].Class].Level
				let lvl = `Lvl ${level} `
				if (playerInfo[message.guild.id + userId].isRenamable === true) {
					if (playerInfo[message.guild.id + userId].lvllcoation === 'Left') {
						message.member.setNickname(lvl + playerInfo[message.guild.id + userId].PlayerName)
					}
					else {
						message.member.setNickname(playerInfo[message.guild.id + userId].PlayerName + lvl)
					}
				}
			}
		}
	}
}

