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

moogle.classeslist = JSON.parse(fs.readFileSync('classeslist.json')) || {}
module.exports.run = function (contents, classlist, guild, masterLevel) {
  try {
    for (let i = 0; i < guild.length; i++) {
      for (let j = 0; j < guild[i].members.array().length; j++) {
        if (guild[i].members.array()[j].user.bot === false) {
          const Classdata = {
            ClassName: 'Adventurer',
            Level: masterLevel[0].Level,
            message: [0, 50],
            Exp: 0,
            Hp: [100, 100],
            Mp: [50, 50],
            Atk: 10,
            Def: 10,
            Skill: 'none',
            ClassInfo: 'this is a noobClass'
          }
          moogle.classeslist[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] = moogle.classeslist[guild[i].id + guild[i].members.array()[j].user.id + Classdata.ClassName] || Classdata
        }
      }
    }
  } catch (err) { console.log(`ERROR: Class \`${guild[1].members.array()}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
  saveData()
}
function saveData () {
  fs.writeFileSync('classeslist.json', JSON.stringify(moogle.classeslist), moogle.catch)
}

module.exports.saveData = function () {
  fs.writeFileSync('classeslist.json', JSON.stringify(moogle.classeslist), moogle.catch)
}
