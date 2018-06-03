


module.exports.run = function (monsters, monsterslist) {
	try {
		const Mosterdata = {
			MonsterName: 'dragon',
			Level: 1,
			Hp: [200, 200],
			Mp: [50, 50],
			Atk: 20,
			Def: 20,
			Exp: 20,
			Gold: 100,
			Items: 'revive',
			Skill: 'none',
			MonsterInfo: 'this is a real Monster'
		}
		monsterslist[Mosterdata.MonsterName] = monsterslist[Mosterdata.MonsterName] || Mosterdata
		monsters.push(Mosterdata.MonsterName)
	} catch (err) { console.log(`ERROR: Monster \`${monsterslist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
}
