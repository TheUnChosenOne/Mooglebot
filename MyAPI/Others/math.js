


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

export function DnDStatRolls () {
	let Rolls = [getRandomIntInclusive(1, 6), getRandomIntInclusive(1, 6), getRandomIntInclusive(1, 6), getRandomIntInclusive(1, 6)]
	return removeSmallest(Rolls)
}

function removeSmallest(numbers) {
	let smallestNumberKEY = 0
	
	for (var i = 0; i < numbers.length - 1; i++) {
		if (numbers[i + 1] < numbers[i]) {
			smallestNumberKEY = i + 1
			numbers.splice(smallestNumberKEY, 1)
			if(numbers.length < 3){
				numbers.push(getRandomIntInclusive(1, 6))
			}
		}
	}
	return numbers
}

export let Modifier = {
	1: -5,
	2: -4,
	3: -4,
	4: -3,
	5: -3,
	6: -2,
	7: -2,
	8: -1,
	9: -1,
	10: 0,
	11:	0,
	12: 1,
	13:	1,
	14: 2,
	15:	2,
	16: 3,
	17:	3,
	18: 4,
	19:	4,
	20: 5,
	21:	5,
	22: 6,
	23:	6,
	24: 7,
	25:	7,
	26: 8,
	27:	8,
	28: 9,
	29:	9,
	30:	10,
}