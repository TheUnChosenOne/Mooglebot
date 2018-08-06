import { DnDStatRolls } from "../MyAPI/Others/math";



export function run (monsters, monsterslist) {
	try {
		let setHp = DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2]
		const Mosterdata = {
			MonsterName: 'dragon',
			Level: 1,
			Hp: [18 * setHp, 18 * setHp],
			Mp: [12 * 10, 12 * 10],
			Atk: 19,
			Def: 15,
			Exp: 20,
			ArmorClass: 17,
			Strength: 19,
			Dexterity: 15,
			Constitution: 18,
			Intelligence: 12,
			Wisdom: 10,
			Charisma: 13,
			Gold: 100,
			Items: 'revive',
			Skill: 'none',
			MonsterInfo: 'this is a real Monster'
		}
		monsterslist[Mosterdata.MonsterName] = monsterslist[Mosterdata.MonsterName] || Mosterdata
		monsters.push(Mosterdata.MonsterName)
	} catch (err) { console.log(`ERROR: Monster \`${monsterslist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
}
