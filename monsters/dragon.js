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
// const monsters = JSON.parse(fs.readFileSync('monsters.json')) || []
// moogle.Monsters = monsters || []

moogle.monsterslist = JSON.parse(fs.readFileSync('monsterslist.json')) || {}

module.exports.run = function (monsters) {
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
      Items: `Revives`,
      Skill: 'none',
      MonsterInfo: 'this is a real Monster'
    }
    moogle.monsterslist[Mosterdata.MonsterName] = moogle.monsterslist[Mosterdata.MonsterName] || Mosterdata
    monsters.push(Mosterdata.MonsterName)
  } catch (err) { console.log(`ERROR: Monster \`${moogle.monsterslist}\` has encountered an error. Please contact Jackmaster9000 or your Server Admin to (hopefully) correct this issue.`) }
  saveData()
}
function saveData () {
  fs.writeFileSync('monsterslist.json', JSON.stringify(moogle.monsterslist))
  // fs.writeFileSync('monsters.json', JSON.stringify(moogle.Monsters))
}
