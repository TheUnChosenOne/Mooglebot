import { clean } from '../MyAPI/BotLevelSysteam/levelProcessing'


const Discord = require('discord.js')

module.exports.run = function (Skillablity, SkillName, Skilllist) {
	try {
		const Skilldata = {
			SkillName: 'scan',
			SkillId: 0,
			Mpcost: 5,
			Effect: function (getC,
				getD,
				message,
				playerSkills,
				user,
				botlogs,
				botInfo) {
				const server = message.guild
				const embed = new Discord.RichEmbed()
				let botid = user.id
				botlogs(clean(botInfo[server.id + botid].BattleMode))
				const enemy = server.members.get(botid).__currentBattleEnemy
				if (server.members.get(botid).user.bot === false) return message.author.send('this skill can only be use one the enemy.')
				if (getC.Level - 5 > server.members.get(botid).__currentBattleEnemyLv) {
					message.channel.send('You may not use skills on enemies more than 5 levels below your own level. Kupo!')
					return
				}
				if (botInfo[server.id + botid].BattleMode === true) {
					if (getC.Mp[0] < 5) {
						return message.author.send('You do not have MP to use this skill.')
					}
					getC.Mp[0] -= 5
					embed.setTitle('```Enemy\'s Data```')
					embed.addField(`\`\`\`Name: ${enemy.MonsterName} Level: ${enemy.Level}\`\`\``, `\`\`\`js\nHP: ${enemy.health}\nATK: ${enemy.atk}\nDEF: ${enemy.def}\nEXP: ${enemy.exp}\nGold:${enemy.Gold}\nItem: ${enemy.Items}\nInfo: ${enemy.MonsterInfo}\`\`\``)
					message.author.send(embed)
				} else {
					message.channel.send(` ${server.members.get(botid).user.username} has not been crrupted in this ` + server.name)
				}
			},
			SkillInfo: 'Scans to get info on enemy'
		}
		Skilllist[Skilldata.SkillName] = Skilllist[Skilldata.SkillName] || Skilldata
		Skillablity.push({scan: Skilldata})
		SkillName.push(Skilldata.SkillName)
	} catch (err) { console.log(`ERROR: Skill \`${Skilllist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
}
