
import { DnDStatRolls } from '../MyAPI/Others/math'
import { getData } from '../MyAPI/DataSysteam/getDataInfo';

export function run(contents, classlist, guild, classsave, Classes, playerInfo, ClassName) {
	for (let i = 0; i < guild.length; i++) {
		for (let j = 0; j < guild[i].members.array().length; j++) {
			if (guild[i].members.array()[j].user.bot === false) {
				let setHp = DnDStatRolls()[0] + DnDStatRolls()[1] + DnDStatRolls()[2]
				const Classdata = {
					ClassName: 'Adventurer',
					lvl: '',
					expNeeded: 1,
					minLevel: 0,
					maxLevel: 10,
					Level: 0,
					message: [0, 50],
					Exp: 0,
					Hp: [getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Constitution * setHp, getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Constitution * setHp],
					Mp: [getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Intelligence * getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Wisdom, getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Intelligence * getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Wisdom],
					Ap: [getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Strength * getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Dexterity, getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Strength * getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Dexterity],
					Atk: getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Strength,
					Def: getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Dexterity,
					MDef: getData(guild[i].members.array()[j].user.id, guild[i].id, playerInfo).Constitution,
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
