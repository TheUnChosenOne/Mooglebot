import { DnDStatRolls } from "../MyAPI/Others/math";


export function run(monsters, monsterslist) {
	try {
		let setHp = DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2]
		const Mosterdata = {
			MonsterName: 'SRBot',
			Level: 1,
			Hp: [15 * setHp, 15 * setHp],
			Mp: [18 * 13, 18 * 13],
			Atk: 16,
			Def: 10,
			ArmorClass: 15,
			Strength: 16,
			Dexterity: 10,
			Constitution: 15,
			Intelligence: 18,
			Wisdom: 13,
			Charisma: 10,
			Exp: 20,
			Gold: 100,
			Items: 'Potion',
			Skill: 'None',
			MonsterInfo: 'a legndary bot that comes from a lost civelisation'
		}
		monsterslist[Mosterdata.MonsterName] = monsterslist[Mosterdata.MonsterName] || Mosterdata
		monsters.push(Mosterdata.MonsterName)
	}
	catch (err) {
		console.log(`ERROR: Monster \`${monsterslist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`)
	}
}
