


export function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function GetAverageMaxLevel(guild, playerInfo, classeslist) {
	const members = guild.members.array()
	let amount = 0
	let result = 1
	let max = 0
	for (let i = 0; i < members.length; i++) {
		const user = members[i]
		const id = user.id

		if (!playerInfo[guild.id + id]) continue
		const lvl = classeslist[playerInfo[guild.id + id].Class].Level

		result += lvl
		if (lvl > max) max = lvl
		amount++
	}
	const average = Math.round(result / amount)
	return [average, max]
}

export function parseWhole(number) {
	return parseInt(number) > 0 ? parseInt(number) : 0
}
