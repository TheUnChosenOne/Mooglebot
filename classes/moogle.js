
export function run (contents, classlist, guild, classsave, Classes) {
	try {
		for (let i = 0; i < guild.length; i++) {
			for (let j = 0; j < guild[i].members.array().length; j++) {
				if (guild[i].members.array()[j].user.bot === false) {
					const Classdata = {
						ClassName: 'Moogle',
						lvl: '',
						expNeeded: 5,
						minLevel: 0,
						maxLevel: 10,
						Level: 0,
						message: [0, 50],
						Exp: 0,
						Hp: [9999, 9999],
						Mp: [9999, 9999],
						Ap: [999, 999],
						Atk: 9999,
						Def: 9999,
						MDef: 9999,
						Skill: [],
						Skillinfo: {},
						Sp: 0,
						limit: [0, 100],
						ClassInfo: 'I am a Moogle. Kupo!',
						UnlockReq: { ClassReq: { Class: { ClassName: 'none', ClassLvl: 0, }, ItemReq: { ItemName: 'none' }, PermReq: 'admin' } },
						ClassUnlocked: false,
					}
					classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] = classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] || Classdata
					//leveling(Classdata.lvl, Classdata.Exp, Classdata.expNeeded, Classdata.minLevel, Classdata.maxLevel, Classes[Classdata.ClassName].levelSys)
					Classes[Classdata.ClassName] = Classes[Classdata.ClassName] || Classdata
				}
			}
		}
	} catch (err) { console.log(`ERROR: Class \`${guild[1].members.array()}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
}

