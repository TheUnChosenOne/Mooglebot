


module.exports.run = function (monsters, Enemyslist) {
	try {
		const Enemydata = {
			MonsterName: 'Bunny',
			Level: 1,
			Hp: [100, 100],
			Mp: [50, 50],
			Atk: 5,
			Def: 5,
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
