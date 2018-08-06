import { DnDStatRolls } from "../MyAPI/Others/math";



export function run (monsters, Enemyslist) {
	try {
		let setHp = DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2]
		const Enemydata = {
			MonsterName: 'Bunny',
			Level: 1,
			Hp: [7 * setHp, 7 * setHp],
			Mp: [2 * 10, 2 * 10],
			Atk: 1,
			Def: 13,
			ArmorClass: 11,
			Strength: 1,
			Dexterity: 13,
			Constitution: 7,
			Intelligence: 2,
			Wisdom: 10,
			Charisma: 3,
			Exp: 10,
			Gold: 50,
			Items: 'Potion',
			Skill: 'None',
			MonsterInfo: 'this is a noob Monster'
		}
		Enemyslist[Enemydata.MonsterName] = Enemyslist[Enemydata.MonsterName] || Enemydata
		monsters.push(Enemydata.MonsterName)
	} catch (err) { console.log(`ERROR: Monster \`${Enemyslist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`)}
}
