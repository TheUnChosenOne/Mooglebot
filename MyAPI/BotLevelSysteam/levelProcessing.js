import { getClassData } from '../DataSysteam/getDataInfo'

export function clean(text) {
	if (typeof (text) === 'string') { return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`) }
	return text
}
let PreviousAuthor = ''
let PreviousMessage = ''

export function ProcessLeveling(userId, message, playerInfo, classeslist) {
	const user = message.author
	if (!playerInfo[message.guild.id + user.id]) return
	if (!user.Client) {
		if (PreviousAuthor !== user.id &&
                PreviousMessage.length !== message.content.length) {
			GiveExp(userId, message, playerInfo, classeslist)
		}
		PreviousAuthor = user.id
		PreviousMessage = message.content
	}
}


export function GiveExp(userId, message, playerInfo, classeslist) {
	try {
		if (!playerInfo[message.guild.id + userId]) {
			playerInfo[message.guild.id + userId] = {}

			console.log(playerInfo)
		} else {
			if (getClassData(userId, message.guild.id, playerInfo, classeslist).message[0] !== getClassData(userId, message.guild.id, playerInfo, classeslist).message[1]) {
				getClassData(userId, message.guild.id, playerInfo, classeslist).message[0]++
				getClassData(userId, message.guild.id, playerInfo, classeslist).Exp++
				console.log(getClassData(userId, message.guild.id, playerInfo, classeslist).message[0])
			}
		}
	} catch (err) { console.log(`ERROR: I will not accept '${getClassData(userId, message.guild.id, playerInfo, classeslist).Exp}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
}