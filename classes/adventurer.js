import { leveling } from '../MyAPI/BotLevelSysteam/levelMinAndMax'

const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const Permissions = Discord.Permissions
const GuildMember = Discord.GuildMember
const User = Discord.User
const TextChanel = Discord.TextChannel

const moogle = {}

// module.exports.run = function () {
//   console.log(`cookies`)
// }

// moogle.classeslist = JSON.parse(fs.readFileSync('../../Data/classeslist.json')) || {}
export function run (contents, classlist, guild, classsave, Classes, ClassName) {
//	try {
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
					Skillinfo: {'scan': {'SkillName': 'scan'}},
					ClassInfo: 'this is a noobClass'
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
	//	} catch (err) { console.log(`ERROR: Class \`${guild[1].members.array()}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
	// saveData(classsave)
}
function saveData (classsave) {
	fs.writeFileSync('../../Data/classeslist.json', JSON.stringify(classsave))
}