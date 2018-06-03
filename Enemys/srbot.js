

export function run(monsters, monsterslist) {
	try {
		const Mosterdata = {
			MonsterName: 'SRBot',
			Level: 1,
			Hp: [100, 100],
			Mp: [50, 50],
			Atk: 10,
			Def: 10,
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
