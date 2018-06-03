

const fs = require('fs')

// module.exports.run = function () {
//   console.log(`cookies`)
// }

// moogle.classeslist = JSON.parse(fs.readFileSync('../Data/classeslist.json')) || {}
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
						MDef: 5,
						Skill: [],
						Skillinfo: {},
						Sp: 0,
						ClassInfo: 'I am a Moogle. Kupo!'
					}
					classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] = classsave[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] || Classdata
					//leveling(Classdata.lvl, Classdata.Exp, Classdata.expNeeded, Classdata.minLevel, Classdata.maxLevel, Classes[Classdata.ClassName].levelSys)
					Classes[Classdata.ClassName] = Classes[Classdata.ClassName] || Classdata
				}
			}
		}
	} catch (err) { console.log(`ERROR: Class \`${guild[1].members.array()}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
	//saveData(classsave)
}
function saveData (classsave) {
	fs.writeFileSync('../Data/classeslist.json', JSON.stringify(classsave))
}
