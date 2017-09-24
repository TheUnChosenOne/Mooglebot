const Discord = require('discord.js')
const util = require('util')
const fs = require('fs')
const EventEmitter = require('events')

const moogle = {}
const Client = new Discord.Client()

moogle.playerInfo = JSON.parse(fs.readFileSync('playerInfo.json', moogle.catch)) || {}

function getData (userId, message) {
  return moogle.playerInfo[message.guild.id + userId]
}

function clean (text) {
  if (typeof (text) === 'string') { return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`) } return text
}
module.exports.lvllist = module.exports.lvllist || []

module.exports.messagereset = function (rs) {
  const servers = Client.guilds.array()
  for (let i = 0; i < servers.length; i++) {
    const guild = servers[i]
    const members = guild.members.array()
    for (let i = 0; i < members.length; i++) {
      const user = members[i]
      moogle.playerInfo[guild.id + user.id].message[0] = '0'
      console.log(moogle.playerInfo[guild.id + user.id].message[0])
    }
  }

      // console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
}

moogle.PreviousAuthor = ''
moogle.PreviousMessage = ''

module.exports.leveling = function (lvl) {
  let cerrentXP = 0
  let expNeeded = 10
  const minlevel = 0 // first level to display
  const maxlevel = 100 // last level to display

  for (lvl = minlevel; lvl <= maxlevel; lvl++) {
    cerrentXP += Math.floor(lvl + 300 * Math.pow(1, lvl / 7.0))
      // console.log('Level ' + (lvl) + ' - ' + expNeeded + ' xp
    const levels = {
      Level: (lvl),
      Exp: expNeeded
    }
    module.exports.lvllist.push(levels)
    if (lvl >= minlevel) {
    }

    expNeeded = Math.floor(cerrentXP / 4)
  }
}
module.exports.ProcessLeveling = function (userId, message) {
  const user = message.author
  if (!user.Client) {
    if (moogle.PreviousAuthor !== user.id &&
        moogle.PreviousMessage.length !== message.content.length) {
      moogle.GiveExp(userId, message)
    }
    moogle.PreviousAuthor = user.id
    moogle.PreviousMessage = message.content
  }
}

module.exports.CheckForLevelChange = function (userId, message, moogle) {
  getData(userId, message)
  console.log(moogle.playerInfo[message.guild.id + userId].Exp)
  var exp = getData(userId, message).Exp
   // const exp = moogle.PlayerInfo[message.guild.id + userId].Exp
  try {
    if (!moogle.playerInfo[message.guild.id + userId]) {
      moogle.playerInfo[message.guild.id + userId] = {}

      console.log(moogle.playerInfo)
    } else {
      let setLevel = module.exports.lvllist.length
      for (let i = 0; i < moogle.lvllist.length; i++) {
        if (exp < moogle.lvllist[i].Exp) {
          setLevel = moogle.lvllist[i].Level
          break
        }
      }
      if (moogle.playerInfo[message.guild.id + userId].Level !== setLevel) {
        moogle.playerInfo[message.guild.id + userId].Level = setLevel
        console.log(`${moogle.playerInfo[message.guild.id + userId].PlayerName} Leveled up to ${setLevel}`)
        console.log(moogle.playerInfo[message.guild.id + userId].Level)
      // if (userId.bannable) {
      //   let lvl = setLevel === 0 ? 'L00' : 'L' + setLevel.pad(2)
      //   if (moogle.PlayerInfo[id]['flags'].isDead) {
      //     lvl = 'Dead'
      //   }
      //    moogle.SetNickname(user, lvl)
      // }
        moogle.OnLevelChange(userId, setLevel, message)
      }
    }
  } catch (err) { console.log(`ERROR: I will not accept '${exp}' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
}
moogle.GiveExp = function (userId, message) {
  try {
    if (!moogle.playerInfo[message.guild.id + userId]) {
      moogle.playerInfo[message.guild.id + userId] = {}

      console.log(moogle.playerInfo)
    } else {
      if (moogle.playerInfo[message.guild.id + userId].message[0] !== moogle.playerInfo[message.guild.id + userId].message[1]) {
        moogle.playerInfo[message.guild.id + userId].message[0]++
        moogle.playerInfo[message.guild.id + userId].Exp++
        console.log(moogle.playerInfo[message.guild.id + userId].message[0])
      }
    }
  } catch (err) { console.log(`ERROR: I will not accept 'Exp' as JS! Kupo!\n\`\`\`js\n${clean(err)}\`\`\``) }
}
