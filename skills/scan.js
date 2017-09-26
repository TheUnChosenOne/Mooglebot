const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const moogle = {}

module.exports.run = function (Skillablity, SkillName, Skilllist) {
  try {
    const Skilldata = {
      SkillName: 'scan',
      SkillId: 0,
      Mpcost: 5,
      Effect: function (getC, getD, message, playerSkills) {
        const server = message.guild
        const embed = new Discord.RichEmbed()
        const enemy = server.__currentBattleEnemy

        embed.setTitle(`Enemy's Data`)
        embed.addField(`Name:${enemy.MonsterName} Level:${enemy.Level}`, `HP:${enemy.HP}\nATK:${enemy.Atk}\nDEF${enemy.Def}`)
        message.author.send(embed)
      },
      SkillInfo: 'Scans enemy for info'
    }
    Skilllist[Skilldata.SkillName] = Skilllist[Skilldata.SkillName] || Skilldata
    Skillablity.push({scan: Skilldata})
    SkillName.push(Skilldata.SkillName)
  } catch (err) { console.log(`ERROR: Skill \`${Skilllist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
}
