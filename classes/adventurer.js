
export function run (contents, classlist, guild, classsave, Classes, ClassName) {
	for (let i = 0; i < guild.length; i++) {
		for (let j = 0; j < guild[i].members.array().length; j++) {
			if (guild[i].members.array()[j].user.bot === false) {
				const Classdata = {
					ClassName: 'Adventurer',
					lvl: '',
					expNeeded: 1,
					minLevel: 0,
					maxLevel: 10,
					Level: 0,
					message: [0, 50],
					Exp: 0,
					Hp: [100, 100],
					Mp: [50, 50],
					Ap: [50, 50],
					Atk: 10,
					Def: 10,
					MDef:5,
					Skill: ['scan'],
					Sp: 0,
					limit:[0, 100],
					Skillinfo: {'scan': {'SkillName': 'scan'}},
					ClassInfo: 'this is a noobClass',
					UnlockReq: { ClassReq: { Class: { ClassName: 'none', ClassLvl: 0, }, ItemReq: { ItemName: 'none' }, PermReq:'none'}},
					ClassUnlocked: true,
				}
				classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] = classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] || Classdata
				if (Classes[Classdata.ClassName]) {
					console.log('done')
				} else {
					Classes[Classdata.ClassName] = Classes[Classdata.ClassName] || Classdata
					ClassName.push(Classdata.ClassName)
				}
			}
		}
	}
}
